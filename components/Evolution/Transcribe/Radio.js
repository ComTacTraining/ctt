import { useSelector, useDispatch } from 'react-redux'
import {
  updatePartialTranscript,
  updateCompletedTranscript,
  addToLog
} from 'store/actions/ai'
import * as aiActions from 'store/actions/ai'
import * as React from 'react'

const Radio = () => {
  const dispatch = useDispatch()
  const [micOpen, setMicOpen] = React.useState(false)
  const { isRecordingMicrophone } = useSelector(state => state.ai)
  const { firstOnScene } = useSelector(state => state.user)

  React.useEffect(() => {
    const setupRecorder = () => {
      setMicOpen(true)
      console.log('Code needed to begin streaming user mic')
    }

    const teardownRecorder = () => {
      setMicOpen(false)
      console.log('Code needed to stop streaming user mic')
    }

    if (isRecordingMicrophone && !micOpen) {
      setupRecorder()
    } else if (!isRecordingMicrophone && micOpen) {
      teardownRecorder()
    }
  }, [isRecordingMicrophone, micOpen])


  const handleTranscriptionUpdate = (text) => {
    dispatch(updatePartialTranscript(text))
  }

  const handleTranscriptionCompletion = (text) => {
    dispatch(updateCompletedTranscript(text))
    dispatch(
      addToLog({
        timestamp: Date.now(),
        label: firstOnScene,
        text: text
      })
    )
  }

  return (
    <div id='Radio'></div>
  )
}

export default Radio