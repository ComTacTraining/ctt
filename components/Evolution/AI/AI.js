import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Command from './Command'
import Tips from './Tips'
import Evaluation from './Evaluation'
import DispatchCenter from './DispatchCenter'
import Units from './Units'
import IncomingCommandOfficer from './IncomingCommandOfficer'
import {
  options,
  randomSelection,
  strReplace,
  groupDisplayToConst,
  groupConstToDisplay
} from 'utils/ai'
import { options as evo } from 'utils/evolution'
import * as aiActions from 'store/actions/ai'

const { unassignedIncidentVoice } = options

const AI = () => {
  const {
    firstAlarmAnnounced,
    threeSixtyWalkthroughCompleted: walkthrough360,
    threeSixtyAssessmentCompleted,
    incidentAnnounced,
    incidentCompleted,
    groupsAssigned,
    lastPlayedVideo,
    command
  } = useSelector((state) => state.ai)

  const { street, incidentGroup, incidentCommand } = useSelector(
    (state) => state.evolution
  )

  const dispatch = useDispatch()

  const [introFinished, setIntroFinished] = useState(false)

  useEffect(() => {
    if (firstAlarmAnnounced || lastPlayedVideo === 'intro') {
      setIntroFinished(true)
    }
  }, [lastPlayedVideo, firstAlarmAnnounced])

  useEffect(() => {
    if (!walkthrough360 && lastPlayedVideo === 'alpha') {
      dispatch(aiActions.threeSixtyWalkthroughCompleted())
    }
  }, [lastPlayedVideo, walkthrough360, dispatch])

  useEffect(() => {
    const alphaStreet = street.replace(/[0-9]/g, '').trim()
    let incidentName = alphaStreet
    evo.suffixes.forEach((suffix) => {
      incidentName = strReplace(incidentName, suffix, '').trim()
    })
    const commandDesignation = randomSelection(['IC', 'Command'])
    dispatch(aiActions.setCommandName(`${incidentName} ${commandDesignation}`))
  }, [street, dispatch])

  // unhandled incident
  useEffect(() => {
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
      dispatch(aiActions.addToSpeechQueue(speech))
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

  useEffect(() => {
    if (incidentAnnounced && !incidentCompleted && command) {
      dispatch(aiActions.incidentCompleted())
    }
  }, [incidentAnnounced, incidentCompleted, command, dispatch])

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
