import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as aiActions from 'store/actions/ai'
import {
  anyTermsMatchString,
  options,
  properPronouns,
  randomSelection
} from 'utils/ai'
import { replaceSpelledOutNumbers } from 'utils/units'
const {
  maxUnitArrivalSeconds,
  canReportTerms,
  parReportTerms,
  icsNimsGroups,
  parReport
} = options

const Unit = ({ name, voice, index }) => {
  const dispatch = useDispatch()
  const {
    command,
    incidentCommandName,
    assignmentResponses,
    incidentAnnounced: announcedIncident,
    incidentResponded,
    groupsAssigned
  } = useSelector((state) => state.ai)
  const {
    incidentGroup,
    incidentCommand,
    withstanding,
    attack,
    ventilation,
    exposure,
    ric,
    medical
  } = useSelector((state) => state.evolution)
  const [unitName] = useState(name)
  const [announcement, setAnnouncement] = useState('')
  const [response, setResponse] = useState('')
  const [assignmentResponse, setAssignmentResponse] = useState('')
  const [assignmentCommand, setAssignmentCommand] = useState('')
  const [arrived, setArrived] = useState(false)
  const [icsNimsGroup, setIcsNimsGroup] = useState('')
  const [lastCommand, setLastCommand] = useState('')

  useEffect(() => {
    const unitSpeech = () => {
      const speech = {
        label: unitName,
        text: response
          ? response
          : assignmentResponse
          ? assignmentResponse
          : announcement,
        voice: voice,
        meta: assignmentResponse ? 'UNIT_ASSIGNMENT_RESPONSE' : null
      }

      if (response || assignmentResponse) {
        dispatch(aiActions.addToFrontOfSpeechQueue(speech))
        setResponse('')
        setAssignmentResponse('')
      } else {
        dispatch(aiActions.addToSpeechQueue(speech))
        setAnnouncement('')
      }
    }

    if (announcement || response || assignmentResponse) {
      unitSpeech()
    }
  }, [announcement, response, assignmentResponse, unitName, voice, dispatch])

  useEffect(() => {
    let interval

    if (unitName) {
      let timeout = 0
      if (index === 0) {
        timeout = 3
        dispatch(aiActions.addUnitArrival({ name: unitName, arrival: Date.now() }))
      } else {
        const minUnitArrivalSeconds = Math.floor(maxUnitArrivalSeconds / 3)
        timeout = Math.floor(
          Math.random() * (maxUnitArrivalSeconds - minUnitArrivalSeconds + 1) +
            minUnitArrivalSeconds
        )
        timeout *= 1000
        dispatch(
          aiActions.addUnitArrival({ name: unitName, arrival: Date.now() + timeout })
        )
      }
      interval = setTimeout(() => {
        setAnnouncement(`${unitName} on scene staged requesting an assignment.`)
        setArrived(true)
      }, timeout)
    }

    return () => clearTimeout(interval)
  }, [unitName, index, dispatch])

  useEffect(() => {
    const checkForAssignment = () => {
      let found = false
      icsNimsGroups.forEach((group) => {
        if (!groupsAssigned.includes(group.name)) {
          if (anyTermsMatchString(command, group.terms)) {
            found = true
            setIcsNimsGroup(group.name)
            setAssignmentCommand(command)
            const possibleResponses = [
              `${incidentCommandName} from ${unitName}. I copy I am ${group.name} group.`,
              `${incidentCommandName} from ${unitName}. I am ${group.name} group.`,
              `${incidentCommandName} from ${unitName}. I copy I will be ${group.name} group.`
            ]
            const assignmentAcknowledgement = randomSelection(possibleResponses)
            const commandRepeat = properPronouns(command)
            setAssignmentResponse(`${assignmentAcknowledgement} ${commandRepeat}`)
            dispatch(aiActions.incrementUnitsAssigned())
            dispatch(aiActions.addAssignedGroup(group.name))
            dispatch(
              aiActions.addUnitGroupAssignment({ name: unitName, group: group.name })
            )
          }
        }
      })
      return found
    }

    const unassigned = () => {
      const possibleResponses = [
        `${incidentCommandName} from ${unitName}. Please repeat my assigned group.`,
        `${incidentCommandName} from ${unitName}. Please repeat.`
      ]
      const cmd = randomSelection(possibleResponses)
      setAssignmentResponse(cmd)
    }

    const checkIfAddressed = async () => {
      const numberedCommand = replaceSpelledOutNumbers(command)
      if (anyTermsMatchString(numberedCommand, unitName)) {
        const assigned = await checkForAssignment()
        if (!assigned) {
          unassigned()
        }
      }
    }

    if (!icsNimsGroup && arrived && command) {
      checkIfAddressed()
    }
  }, [arrived, command, icsNimsGroup, unitName, incidentCommandName, groupsAssigned, dispatch])

  useEffect(() => {
    const checkForNeeds = () => {
      switch (icsNimsGroup) {
        case 'Fire Attack':
          return attack
        case 'Ventilation':
          return ventilation
        case 'Exposure':
          return exposure
        case 'RIC':
          return ric
        case 'Medical':
          return medical
        default:
          return false
      }
    }

    const getType = (needs) => {
      let type = withstanding ? 'WITHSTANDING_WITH' : 'NOT_WITHSTANDING_WITH'
      type += needs ? '_NEEDS' : 'OUT_NEEDS'
      return type
    }

    const checkForCanReport = () => {
      if (anyTermsMatchString(command, canReportTerms)) {
        const group = icsNimsGroups.find((group) => group.name === icsNimsGroup)
        const type = getType(checkForNeeds())
        const canReport = group.canReports.find(
          (report) => report.type === type
        ).response
        setResponse(canReport)
      }
    }

    const checkForParReport = () => {
      if (anyTermsMatchString(command, parReportTerms)) {
        setResponse(parReport)
      }
    }

    const checkIfAddressed = () => {
      if (anyTermsMatchString(command, [unitName, icsNimsGroup])) {
        checkForCanReport()
        checkForParReport()
      }
    }

    if (icsNimsGroup && command && assignmentCommand && command !== assignmentCommand) {
      checkIfAddressed()
    }
  }, [
    icsNimsGroup,
    command,
    assignmentCommand,
    unitName,
    withstanding,
    attack,
    ventilation,
    exposure,
    ric,
    medical
  ])

  useEffect(() => {
    const normalizedGroup = () => {
      let group = ''
      switch (incidentGroup) {
        case 'FIRE_ATTACK':
          group = 'Fire Attack'
          break
        case 'VENTILATION':
          group = 'Ventilation'
          break
        case 'EXPOSURE':
          group = 'Exposure'
          break
        case 'RIC':
          group = 'RIC'
          break
        case 'MEDICAL':
          group = 'Medical'
          break
        default:
          break
      }
      return group
    }

    if (!announcedIncident && icsNimsGroup && assignmentResponses > 2) {
      const group = normalizedGroup()
      if (group === icsNimsGroup) {
        const incident = incidentCommand.replace('__NAME__', icsNimsGroup)
        setResponse(incident)
        setLastCommand(command)
        dispatch(aiActions.incidentAnnounced())
      }
    }

    if (announcedIncident && !incidentResponded && icsNimsGroup && lastCommand !== command) {
      const group = normalizedGroup()
      if (group === icsNimsGroup) {
        const commandRepeat = properPronouns(command)
        const incidentResponse = `${incidentCommandName} from ${group}. ${commandRepeat}`
        setResponse(incidentResponse)
        dispatch(aiActions.incidentResponded())
      }
    }
  }, [
    command,
    icsNimsGroup,
    assignmentResponses,
    incidentGroup,
    incidentCommand,
    incidentCommandName,
    announcedIncident,
    incidentResponded,
    dispatch
  ])

  return <div></div>
}

Unit.propTypes = {
  name: PropTypes.string.isRequired,
  voice: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
}

export default Unit
