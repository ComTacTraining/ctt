import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Auth from '@aws-amplify/auth'
import Predictions, {
  AmazonAIPredictionsProvider
} from '@aws-amplify/predictions'

const TextToSpeech = ({ incomingText, onFinishedSpeaking }) => {
  const [audioCtx, setAudioCtx] = useState(null)
  const [encodedAudio, setEncodedAudio] = useState(null)
  const [decodedAudio, setDecodedAudio] = useState(null)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    try {
      Predictions.addPluggable(new AmazonAIPredictionsProvider())
    } catch (err) {
      console.log(err)
    }
    const AudioContext = window.AudioContext || window.webkitAudioContext
    setAudioCtx(new AudioContext())
    return () => {
      Predictions.removePluggable(AmazonAIPredictionsProvider.name)
    }
  }, [])

  useEffect(() => {
    const { text, voice } = incomingText

    const processText = async () => {
      try {
        await Auth.currentAuthenticatedUser()
        const result = await Predictions.convert({
          textToSpeech: {
            source: { text },
            voiceId: voice
          }
        })
        setEncodedAudio(result)
      } catch (err) {
        console.log(err)
      }
    }

    if (text !== '' && voice !== '') {
      processText()
    }
  }, [incomingText])

  useEffect(() => {
    if (encodedAudio) {
      audioCtx.decodeAudioData(
        encodedAudio.audioStream,
        (buffer) => setDecodedAudio(buffer),
        (err) => console.log({ err })
      )
    }
  }, [encodedAudio, audioCtx])

  useEffect(() => {
    if (decodedAudio) {
      setDuration(Math.ceil(decodedAudio.duration))
      const source = audioCtx.createBufferSource()
      source.buffer = decodedAudio
      source.connect(audioCtx.destination)
      source.start(0)
    }
  }, [decodedAudio, audioCtx])

  useEffect(() => {
    const { meta } = incomingText
    let timer
    if (duration > 0) {
      timer = setTimeout(() => {
        if (onFinishedSpeaking) {
          onFinishedSpeaking(meta)
        }
      }, duration * 1000)
    }
    return () => clearTimeout(timer)
  }, [duration, incomingText, onFinishedSpeaking])

  return <div />
}

TextToSpeech.propTypes = {
  incomingText: PropTypes.object,
  onFinishedSpeaking: PropTypes.func
}

export default TextToSpeech
