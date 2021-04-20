import { useEffect, useState } from 'react'
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
  useRadio,
  speakCompleted
} from 'store/actions/ai'

const TextToSpeech = () => {
  const dispatch = useDispatch()
  const { radioInUse, textToSpeech } = useSelector((state) => state.ai)
  const [audioCtx, setAudioCtx] = useState(null)
  const [encodedAudio, setEncodedAudio] = useState(null)
  const [decodedAudio, setDecodedAudio] = useState(null)
  const [duration, setDuration] = useState(0)
  const [finishedSpeaking, setFinishedSpeaking] = useState(false)
  const [lastText, setLastText] = useState('')

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
      setDuration(Math.ceil(decodedAudio.duration) + 1)
      const source = audioCtx.createBufferSource()
      source.buffer = decodedAudio
      source.connect(audioCtx.destination)
      source.start(0)
    }
  }, [decodedAudio, audioCtx])

  useEffect(() => {
    let timer
    if (duration > 0) {
      timer = setTimeout(() => {
        setFinishedSpeaking(true)
        setDuration(0)
      }, duration * 1000)
    }
    return () => clearTimeout(timer)
  }, [duration])

  useEffect(() => {
    const { meta } = textToSpeech
    if (finishedSpeaking) {
      dispatch(speakCompleted())
      if (meta === 'INITIAL_REPORT_RESPONSE') {
        dispatch(threeSixtyWalkthroughBegan())
      }
      if (meta === 'INCOMING_COMMAND_ARRIVED') {
        dispatch(faceToFaceRequested())
      }
      if (meta === 'INCOMING_COMMAND_RESPONSE') {
        dispatch(faceToFaceCompleted())
      }
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
