import * as aiActions from '@/store/actions/ai'
import * as unitsActions from '@/store/actions/units'
import {
  anyTermsMatchString,
  options,
  properPronouns,
  randomSelection
} from '@/utils/ai'
import { replaceSpelledOutNumbers } from '@/utils/units'
import PropTypes from 'prop-types'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
    incidentAnnounced: announcedIncident,
    incidentResponded,
    assignmentsCompleted
  } = useSelector((state) => state.ai)
  const { command, incidentCommandName } = useSelector((state) => state.command)
  const { groupsAssigned, textToSpeech } = useSelector((state) => state.units)
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
  const [unitLabel, setUnitLabel] = React.useState(`${name}`)
  const [assignedGroup, setAssignedGroup] = React.useState('')
  const [assignmentCommand, setAssignmentCommand] = React.useState('')
  const [arrivalAnnounced, setArrivalAnnounced] = React.useState(false)
  const [lastCommand, setLastCommand] = React.useState('')
  const arrivalAnnouncementText = `${name} on scene staged requesting an assignment.`

  React.useEffect(() => {
    let interval

    if (name) {
      let timeout = 0
      if (index === 0) {
        timeout = 3
        dispatch(
          unitsActions.addUnitArrival({ name: name, arrival: Date.now() })
        )
      } else {
        const minUnitArrivalSeconds = Math.floor(maxUnitArrivalSeconds / 3)
        timeout = Math.floor(
          Math.random() * (maxUnitArrivalSeconds - minUnitArrivalSeconds + 1) +
            minUnitArrivalSeconds
        )
        timeout *= 1000
        dispatch(
          unitsActions.addUnitArrival({
            name: name,
            arrival: Date.now() + timeout
          })
        )
      }
      interval = setTimeout(() => {
        dispatch(
          unitsActions.addToFrontOfSpeechQueue({
            label: unitLabel,
            text: arrivalAnnouncementText,
            voice: voice
          })
        )
      }, timeout)
    }
    return () => clearTimeout(interval)
  }, [name, index, dispatch])

  React.useEffect(() => {
    const { text } = textToSpeech
    if (text === arrivalAnnouncementText) {
      setArrivalAnnounced(true)
    }
  }, [textToSpeech])

  React.useEffect(() => {
    if (assignedGroup && unitLabel === name) {
      setUnitLabel(`${assignedGroup} (${name})`)
    }
  }, [unitLabel, assignedGroup])

  React.useEffect(() => {
    const checkForAssignment = () => {
      let found = false
      icsNimsGroups.forEach((group) => {
        if (!groupsAssigned.includes(group.name)) {
          if (anyTermsMatchString(command, group.terms)) {
            found = true
            setAssignedGroup(group.name)
            setAssignmentCommand(command)
            const possibleResponses = [
              `${incidentCommandName} from ${name}. I copy I am ${group.name} group.`,
              `${incidentCommandName} from ${name}. I am ${group.name} group.`,
              `${incidentCommandName} from ${name}. I copy I will be ${group.name} group.`
            ]
            const assignmentAcknowledgement = randomSelection(possibleResponses)
            const commandRepeat = properPronouns(command)
            dispatch(
              unitsActions.addToFrontOfSpeechQueue({
                label: unitLabel,
                text: `${assignmentAcknowledgement} ${commandRepeat}`,
                voice: voice,
                meta: 'UNIT_ASSIGNMENT_RESPONSE'
              })
            )
            dispatch(unitsActions.incrementUnitsAssigned())
            dispatch(unitsActions.addAssignedGroup(group.name))
            dispatch(
              unitsActions.addUnitGroupAssignment({
                name: name,
                group: group.name
              })
            )
          }
        }
      })
      return found
    }

    const unassigned = () => {
      const possibleResponses = [
        `${incidentCommandName} from ${name}. Please repeat my assigned group.`,
        `${incidentCommandName} from ${name}. Please repeat.`
      ]
      dispatch(
        unitsActions.addToFrontOfSpeechQueue({
          label: unitLabel,
          text: randomSelection(possibleResponses),
          voice: voice
        })
      )
    }

    const checkIfAddressed = async () => {
      const numberedCommand = replaceSpelledOutNumbers(command)
      if (anyTermsMatchString(numberedCommand, name)) {
        const assigned = await checkForAssignment()
        if (!assigned) {
          unassigned()
        }
      }
    }

    if (!assignedGroup && arrivalAnnounced && command) {
      checkIfAddressed()
    }
  }, [
    arrivalAnnounced,
    command,
    assignedGroup,
    incidentCommandName,
    groupsAssigned,
    dispatch
  ])

  React.useEffect(() => {
    const checkForNeeds = () => {
      switch (assignedGroup) {
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
        const group = icsNimsGroups.find(
          (group) => group.name === assignedGroup
        )
        const type = getType(checkForNeeds())
        const canReport = group.canReports.find(
          (report) => report.type === type
        ).response
        dispatch(
          unitsActions.addToFrontOfSpeechQueue({
            label: unitLabel,
            text: canReport,
            voice: voice
          })
        )
      }
    }

    const checkForParReport = () => {
      if (anyTermsMatchString(command, parReportTerms)) {
        dispatch(
          unitsActions.addToFrontOfSpeechQueue({
            label: unitLabel,
            text: parReport,
            voice: voice
          })
        )
      }
    }

    const checkIfAddressed = () => {
      if (anyTermsMatchString(command, [name, assignedGroup])) {
        checkForCanReport()
        checkForParReport()
      }
    }

    if (
      assignedGroup &&
      command &&
      assignmentCommand &&
      command !== assignmentCommand
    ) {
      checkIfAddressed()
    }
  }, [
    assignedGroup,
    command,
    assignmentCommand,
    withstanding,
    attack,
    ventilation,
    exposure,
    ric,
    medical
  ])

  React.useEffect(() => {
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

    if (!announcedIncident && assignedGroup && assignmentsCompleted) {
      const group = normalizedGroup()
      if (group === assignedGroup) {
        const incident = incidentCommand.replace('__NAME__', assignedGroup)
        dispatch(
          unitsActions.addToFrontOfSpeechQueue({
            label: unitsLabel,
            text: incident,
            voice: voice
          })
        )
        setLastCommand(command)
        dispatch(aiActions.incidentAnnounced())
      }
    }

    if (
      announcedIncident &&
      !incidentResponded &&
      assignedGroup &&
      lastCommand !== command
    ) {
      const group = normalizedGroup()
      if (group === assignedGroup) {
        const commandRepeat = properPronouns(command)
        const response = `${incidentCommandName} from ${group}. ${commandRepeat}`
        dispatch(
          unitsActions.addToFrontOfSpeechQueue({
            label: unitLabel,
            text: response,
            voice: voice,
            meta: 'INCIDENT_RESPONSE'
          })
        )
        dispatch(aiActions.incidentResponded())
      }
    }
  }, [
    command,
    assignedGroup,
    assignmentsCompleted,
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
