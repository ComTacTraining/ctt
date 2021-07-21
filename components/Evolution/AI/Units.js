import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { options } from 'utils/ai'
import Unit from './Unit'

const Units = () => {
  const {
    threeSixtyAssessmentCompleted,
    transferOfCommandRequested,
    assignmentsCompleted
  } = useSelector((state) => state.ai)
  const { alarm1, firstOnScene, incomingCommandOfficer } = useSelector(
    (state) => state.user
  )
  const [alarmOneUnits, setAlarmOneUnits] = useState([])
  const [availableVoices, setAvailableVoices] = useState([])
  const { voices, dispatchCenterVoice, incomingCommandOfficerVoice } = options

  useEffect(() => {
    setAvailableVoices(
      voices
        .filter(
          (voice) =>
            voice !== dispatchCenterVoice &&
            voice !== incomingCommandOfficerVoice
        )
        .sort(() => {
          return 0.5 - Math.random()
        })
    )
  }, [voices, dispatchCenterVoice, incomingCommandOfficerVoice])

  useEffect(() => {
    if (threeSixtyAssessmentCompleted && !transferOfCommandRequested) {
      setAlarmOneUnits(
        alarm1.filter(
          (alarm) => alarm !== firstOnScene && alarm !== incomingCommandOfficer
        )
      )
    }
  }, [
    threeSixtyAssessmentCompleted,
    transferOfCommandRequested,
    alarm1,
    firstOnScene,
    incomingCommandOfficer
  ])

  return assignmentsCompleted ? null : (
    <div>
      {alarmOneUnits.map((alarm, i) => {
        return (
          <Unit name={alarm} voice={availableVoices[i]} key={alarm} index={i} />
        )
      })}
    </div>
  )
}

export default Units
