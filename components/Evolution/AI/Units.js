import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as aiActions from 'store/actions/ai'
import { options } from 'utils/ai'
import Unit from './Unit'

const Units = () => {
  const dispatch = useDispatch()
  const {
    threeSixtyAssessmentCompleted,
    transferOfCommandRequested,
    assignmentsCompleted
  } = useSelector((state) => state.ai)
  const { alarm1, firstOnScene, incomingCommandOfficer } = useSelector(
    (state) => state.user
  )
  const { assignmentResponses } = useSelector((state) => state.units)
  const [alarmOneUnits, setAlarmOneUnits] = React.useState([])
  const [availableVoices, setAvailableVoices] = React.useState([])
  const { voices, dispatchCenterVoice, incomingCommandOfficerVoice } = options

  React.useEffect(() => {
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

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (!assignmentsCompleted && assignmentResponses > 2) {
      dispatch(aiActions.assignmentsCompleted())
    }
  }, [assignmentsCompleted, assignmentResponses, dispatch])

  return transferOfCommandRequested ? null : (
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
