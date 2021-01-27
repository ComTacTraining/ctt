import * as React from 'react'
import { Auth } from 'aws-amplify'
import Predictions from '@aws-amplify/predictions'

const Test = () => {
  const [audioCtx, setAudioCtx] = React.useState(null)
  const [textToConvert, setTextToConvert] = React.useState('Engine 1.')
  const [voice, setVoice] = React.useState('Joanna')

  React.useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    setAudioCtx(new AudioContext())
  }, [])

  React.useEffect(() => {
    const convertText = async () => {
      await Auth.currentAuthenticatedUser()
      const result = await Predictions.convert({
        textToSpeech: {
          source: { textToConvert },
          voiceId: voice
        }
      })
      setEncodedAudio(result)
    }
    if (audioCtx && textToConvert) {
      convertText()
    }
  }, [audioCtx, textToConvert])
  
  return <div />
}

export default Test