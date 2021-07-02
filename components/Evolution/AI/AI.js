import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as aiActions from 'store/actions/ai'
import {
  groupConstToDisplay, groupDisplayToConst, options,
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
    incidentAnnounced,
    incidentCompleted,
    commandAllowed,
    groupsAssigned,
    faceToFaceCompleted,
    radioInUse,
    lastPlayedVideo
  } = useSelector((state) => state.ai)
  const { usingMic } = useSelector((state) => state.user)
  const { street, incidentGroup, incidentCommand } = useSelector(
    (state) => state.evolution
  )

  const dispatch = useDispatch()

  const [introFinished, setIntroFinished] = React.useState(false)
  const [phaseAllowsCommand, setPhaseAllowsCommand] = React.useState(false)
  const [canCommand, setCanCommand] = React.useState(commandAllowed)

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
    dispatch(aiActions.setCommandName(`${incidentName} ${commandDesignation}`))
  }, [street, dispatch])

  React.useEffect(() => {
    if (faceToFaceCompleted) {
      setPhaseAllowsCommand(false) // end of phase
    } else if (threeSixtyWalkthroughCompleted) {
      setPhaseAllowsCommand(true) // 360 assessment, assignments, face-to-face
    } else if (initialReportCompleted) {
      setPhaseAllowsCommand(false) // 360 walkthrough
    } else if (firstAlarmAnnounced) {
      setPhaseAllowsCommand(true) // initial report
    } else {
      setPhaseAllowsCommand(false) // arrival
    }
  }, [firstAlarmAnnounced, initialReportCompleted, threeSixtyWalkthroughCompleted, faceToFaceCompleted])

  React.useEffect(() => {
    if (phaseAllowsCommand && usingMic && !radioInUse) {
      setCanCommand(true)
    } else {
      setCanCommand(false)
    }
  }, [phaseAllowsCommand, usingMic, radioInUse, dispatch])

  // Only dispatch if changed
  React.useEffect(() => {
    if (canCommand && !commandAllowed) {
      dispatch(aiActions.setCommandAllowed(true))
    }
    if (!canCommand && commandAllowed) {
      dispatch(aiActions.setCommandAllowed(false))
    }
  }, [commandAllowed, canCommand])

  // unhandled incident
  React.useEffect(() => {
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
      dispatch(aiActions.addToFrontOfSpeechQueue(speech))
    }

    if (incidentAnnounced && !incidentCompleted && groupsAssigned.length > 2) {
      if (!checkIncidentAssigned()) {
        genericUnitIncident()
      }
    }
  }, [
    incidentAnnounced,
    incidentCompleted,
    groupsAssigned,
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
