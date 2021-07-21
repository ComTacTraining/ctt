import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToLog } from 'store/actions/review'
import { updateTextToSpeech } from 'store/actions/units'


const Speak = () => {
  const dispatch = useDispatch()
  const {
    firstAlarmAnnounced,
    transferOfCommandCompleted
  } = useSelector((state) => state.ai)
  const {
    waitingToBeSpoken,
    radioInUse,
  } = useSelector((state) => state.units)
  const { commandInProgress } = useSelector((state) => state.command)

  useEffect(() => {
    let cooldown
    if (!commandInProgress && !radioInUse && waitingToBeSpoken.length > 0) {
      const waitTime = firstAlarmAnnounced && !transferOfCommandCompleted ? 2000 : 10
      cooldown = setTimeout(() => {
        const nextSpeech = waitingToBeSpoken[0]
        const { label, text, voice, meta } = nextSpeech
        const timestamp = Date.now()

        dispatch(updateTextToSpeech({ text, voice, meta }))
        dispatch(addToLog({ timestamp, label, text }))
      }, waitTime)
    }
    return () => clearTimeout(cooldown)
  }, [
    waitingToBeSpoken,
    radioInUse,
    commandInProgress,
    firstAlarmAnnounced,
    transferOfCommandCompleted,
    dispatch
  ])

  return <div />
}

export default Speak
