import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToLog, updateTextToSpeech } from 'store/actions/ai'

const Speak = () => {
  const dispatch = useDispatch()
  const {
    waitingToBeSpoken,
    radioInUse,
    firstAlarmAnnounced,
    faceToFaceCompleted
  } = useSelector((state) => state.ai)

  useEffect(() => {
    let cooldown
    if (!radioInUse && waitingToBeSpoken.length > 0) {
      const waitTime = firstAlarmAnnounced && !faceToFaceCompleted ? 2000 : 10
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
    firstAlarmAnnounced,
    faceToFaceCompleted,
    dispatch
  ])

  return <div />
}

export default Speak
