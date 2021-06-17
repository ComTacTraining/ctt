import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Auth from '@aws-amplify/auth'
import Predictions, {
  AmazonAIPredictionsProvider
} from '@aws-amplify/predictions'
import {
  threeSixtyWalkthroughBegan,
  faceToFaceRequested,
  faceToFaceCompleted,
  educationCompleted,
  useRadio,
  speakCompleted
} from 'store/actions/ai'

const TextToSpeech = () => {
  const dispatch = useDispatch()
  const { radioInUse, textToSpeech } = useSelector((state) => state.ai)
  const { masterVolume } = useSelector((state) => state.user)
  const [audioCtx, setAudioCtx] = React.useState(null)
  const [gainNode, setGainNode] = React.useState(null)
  const [encodedAudio, setEncodedAudio] = React.useState(null)
  const [decodedAudio, setDecodedAudio] = React.useState(null)
  const [duration, setDuration] = React.useState(0)
  const [finishedSpeaking, setFinishedSpeaking] = React.useState(false)
  const [lastText, setLastText] = React.useState('')

  React.useEffect(() => {
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

  React.useEffect(() => {
    if (audioCtx) {
      const gainNode = audioCtx.createGain()
      gainNode.gain.value = masterVolume
      gainNode.connect(audioCtx.destination)
      setGainNode(gainNode)
    }
  }, [audioCtx])

  React.useEffect(() => {
    if (gainNode && audioCtx) {
      gainNode.gain.setValueAtTime(masterVolume, audioCtx.currentTime)
    }
  }, [masterVolume, gainNode, audioCtx])

  React.useEffect(() => {
    const { text, voice } = textToSpeech

    const processText = async () => {
      dispatch(useRadio())
      try {
        await Auth.currentAuthenticatedUser()
        const result = await Predictions.convert({
          textToSpeech: {
            source: { text },
            voiceId: voice
          }
        })
        setEncodedAudio(result)
        setLastText(text)
      } catch (err) {
        console.log(err)
      }
    }

    if (!radioInUse && text !== '' && voice !== '' && text !== lastText) {
      processText()
    }
  }, [textToSpeech, radioInUse, lastText])

  React.useEffect(() => {
    if (encodedAudio) {
      audioCtx.decodeAudioData(
        encodedAudio.audioStream,
        (buffer) => setDecodedAudio(buffer),
        (err) => console.log({ err })
      )
    }
  }, [encodedAudio, audioCtx])

  React.useEffect(() => {
    if (decodedAudio) {
      setDuration(Math.ceil(decodedAudio.duration) + 1)
      const source = audioCtx.createBufferSource()
      source.buffer = decodedAudio
      source.connect(gainNode)
      source.start(0)
    }
  }, [decodedAudio, audioCtx, gainNode])

  React.useEffect(() => {
    let timer
    if (duration > 0) {
      timer = setTimeout(() => {
        setFinishedSpeaking(true)
        setDuration(0)
      }, duration * 1000)
    }
    return () => clearTimeout(timer)
  }, [duration])

  React.useEffect(() => {
    const { meta } = textToSpeech
    if (finishedSpeaking) {
      if (meta === 'INITIAL_REPORT_RESPONSE') {
        dispatch(threeSixtyWalkthroughBegan())
      }
      if (meta === 'INCOMING_COMMAND_ARRIVED') {
        dispatch(faceToFaceRequested())
      }
      if (meta === 'INCOMING_COMMAND_RESPONSE') {
        dispatch(faceToFaceCompleted())
      }
      if (meta === 'EDUCATION_COMPLETED') {
        dispatch(educationCompleted())
      }
      dispatch(speakCompleted())
      setFinishedSpeaking(false)
    }
  }, [finishedSpeaking, textToSpeech, dispatch])

  return <div />
}

TextToSpeech.propTypes = {
  incomingText: PropTypes.object,
  meta: PropTypes.string
}

export default TextToSpeech
