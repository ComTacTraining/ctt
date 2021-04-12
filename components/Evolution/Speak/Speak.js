import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToLog, updateTextToSpeech } from 'store/actions/ai'

const Speak = () => {
  const dispatch = useDispatch()
  const { waitingToBeSpoken, radioInUse } = useSelector((state) => state.ai)

  useEffect(() => {
    if (!radioInUse && waitingToBeSpoken.length > 0) {
      const nextSpeech = waitingToBeSpoken[0]
      const { label, text, voice, meta } = nextSpeech
      const timestamp = Date.now()

      dispatch(updateTextToSpeech({ text, voice, meta }))
      dispatch(addToLog({ timestamp, label, text }))
    }
  }, [waitingToBeSpoken, radioInUse, dispatch])

  return <div />
}

export default Speak
