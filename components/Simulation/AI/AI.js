import * as aiActions from '@/store/actions/ai'
import * as commandActions from '@/store/actions/command'
import * as unitsActions from '@/store/actions/units'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  groupConstToDisplay,
  groupDisplayToConst,
  options,
  properPronouns,
  randomSelection,
  strReplace
} from 'utils/ai'
import { options as evo } from 'utils/evolution'
import Command from './Command'
import DispatchCenter from './DispatchCenter'
import Evaluation from './Evaluation'
import IncomingCommandOfficer from './IncomingCommandOfficer'
import Tips from './Tips'
import Units from './Units'

const { unassignedIncidentVoice } = options

const AI = () => {
  const {
    firstAlarmAnnounced,
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    threeSixtyAssessmentCompleted,
    assignmentsCompleted,
    incidentAnnounced,
    incidentResponded,
    incidentCompleted,
    transferOfCommandCompleted
  } = useSelector((state) => state.ai)
  const { commandAllowed, incidentCommandName, command } = useSelector(
    (state) => state.command
  )
  const { groupsAssigned, radioInUse } = useSelector((state) => state.units)
  const { lastPlayedVideo } = useSelector((state) => state.screen)
  const { street, incidentGroup, incidentCommand } = useSelector(
    (state) => state.evolution
  )

  const dispatch = useDispatch()

  const [introFinished, setIntroFinished] = React.useState(false)
  const [phraseAllowsCommand, setPhraseAllowsCommand] = React.useState(false)
  const [canCommand, setCanCommand] = React.useState(commandAllowed)
  const [lastCommand, setLastCommand] = React.useState('')

  React.useEffect(() => {
    if (firstAlarmAnnounced || lastPlayedVideo === 'intro') {
      setIntroFinished(true)
    }
  }, [lastPlayedVideo, firstAlarmAnnounced])

  React.useEffect(() => {
    if (!threeSixtyWalkthroughCompleted && lastPlayedVideo === 'alpha') {
      dispatch(aiActions.threeSixtyWalkthroughCompleted())
    }
  }, [lastPlayedVideo, threeSixtyWalkthroughCompleted, dispatch])

  React.useEffect(() => {
    const alphaStreet = street.replace(/[0-9]/g, '').trim()
    let incidentName = alphaStreet
    evo.suffixes.forEach((suffix) => {
      incidentName = strReplace(incidentName, suffix, '').trim()
    })
    const commandDesignation = randomSelection(['IC', 'Command'])
    dispatch(
      commandActions.setCommandName(`${incidentName} ${commandDesignation}`)
    )
  }, [street, dispatch])

  React.useEffect(() => {
    if (transferOfCommandCompleted) {
      setPhraseAllowsCommand(false) // end of phase
    } else if (threeSixtyWalkthroughCompleted) {
      setPhraseAllowsCommand(true) // 360 assessment, assignments, transfer of command
    } else if (initialReportCompleted) {
      setPhraseAllowsCommand(false) // 360 walkthrough
    } else if (firstAlarmAnnounced) {
      setPhraseAllowsCommand(true) // initial report
    } else {
      setPhraseAllowsCommand(false) // arrival
    }
  }, [
    firstAlarmAnnounced,
    initialReportCompleted,
    threeSixtyWalkthroughCompleted,
    transferOfCommandCompleted
  ])

  React.useEffect(() => {
    if (phraseAllowsCommand && !radioInUse) {
      setCanCommand(true)
    } else {
      setCanCommand(false)
    }
  }, [phraseAllowsCommand, radioInUse, dispatch])

  // Only dispatch if changed
  React.useEffect(() => {
    if (canCommand && !commandAllowed) {
      dispatch(commandActions.setCommandAllowed(true))
    }
    if (!canCommand && commandAllowed) {
      dispatch(commandActions.setCommandAllowed(false))
    }
  }, [commandAllowed, canCommand])

  // unhandled incident
  React.useEffect(() => {
    let interval

    const checkIncidentAssigned = () => {
      let found = false
      groupsAssigned.forEach((group) => {
        if (groupDisplayToConst(group) === incidentGroup) {
          found = true
        }
      })
      return found
    }

    const genericUnitIncident = () => {
      const groupName = groupConstToDisplay(incidentGroup)
      const speech = {
        label: groupName,
        text: incidentCommand.replace('__NAME__', groupName),
        voice: unassignedIncidentVoice
      }
      dispatch(unitsActions.addToFrontOfSpeechQueue(speech))
      dispatch(aiActions.incidentAnnounced())
      setLastCommand(command)
    }

    const genericUnitIncidentResponse = () => {
      const groupName = groupConstToDisplay(incidentGroup)
      const commandRepeat = properPronouns(command)
      const text = `${incidentCommandName} from ${groupName}, ${commandRepeat}`
      const speech = {
        label: groupName,
        text,
        voice: unassignedIncidentVoice,
        meta: 'INCIDENT_RESPONSE'
      }
      dispatch(unitsActions.addToFrontOfSpeechQueue(speech))
      dispatch(aiActions.incidentResponded())
    }

    if (!incidentAnnounced && assignmentsCompleted) {
      interval = setTimeout(() => {
        if (!checkIncidentAssigned()) {
          genericUnitIncident()
        }
      }, 2000)
    }

    if (incidentAnnounced && !incidentResponded && lastCommand !== command) {
      interval = setTimeout(() => {
        if (!checkIncidentAssigned()) {
          genericUnitIncidentResponse()
        }
      }, 500)
    }

    return () => clearTimeout(interval)
  }, [
    lastCommand,
    command,
    incidentAnnounced,
    incidentResponded,
    incidentCompleted,
    groupsAssigned,
    assignmentsCompleted,
    incidentGroup,
    incidentCommand,
    dispatch
  ])

  return (
    <div className='Ai'>
      {introFinished && <DispatchCenter />}
      {firstAlarmAnnounced && <Command />}
      {firstAlarmAnnounced && <Tips />}
      {firstAlarmAnnounced && <Evaluation />}
      {threeSixtyAssessmentCompleted && <Units />}
      {incidentCompleted && <IncomingCommandOfficer />}
    </div>
  )
}

export default AI
