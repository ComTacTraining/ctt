import {
  educationCompleted,
  firstAlarmAnnounced,
  incidentCompleted,
  threeSixtyAssessmentResponded,
  threeSixtyWalkthroughBegan,
  transferOfCommandCompleted,
  transferOfCommandRequested
} from '@/store/actions/ai'
import { addOverlayTitle } from '@/store/actions/screen'
import {
  clearSpeechQueue,
  incrementAssignmentResponses,
  speakCompleted,
  useRadio
} from '@/store/actions/units'
import Auth from '@aws-amplify/auth'
import Predictions, {
  AmazonAIPredictionsProvider
} from '@aws-amplify/predictions'
import PropTypes from 'prop-types'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TextToSpeech = () => {
  const dispatch = useDispatch()
  const { radioInUse, textToSpeech } = useSelector((state) => state.units)
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

  // Pre Speech
  React.useEffect(() => {
    const { meta, text } = textToSpeech
    if (meta === 'SPEAK_WITH_OVERLAY' && text !== '') {
      dispatch(addOverlayTitle(text))
    }
  }, [textToSpeech])

  // Post Speech
  React.useEffect(() => {
    const { meta } = textToSpeech
    if (finishedSpeaking) {
      if (meta === 'FIRST_ALARM_ANNOUNCEMENT') {
        dispatch(firstAlarmAnnounced())
      }
      if (meta === 'INITIAL_REPORT_RESPONSE') {
        dispatch(threeSixtyWalkthroughBegan())
      }
      if (meta === 'THREE_SIXTY_ASSESSMENT_RESPONSE') {
        dispatch(threeSixtyAssessmentResponded())
      }
      if (meta === 'UNIT_ASSIGNMENT_RESPONSE') {
        dispatch(incrementAssignmentResponses())
      }
      if (meta === 'INCIDENT_RESPONSE') {
        dispatch(incidentCompleted())
      }
      if (meta === 'INCOMING_COMMAND_ARRIVED') {
        dispatch(transferOfCommandRequested())
        dispatch(clearSpeechQueue())
      }
      if (meta === 'INCOMING_COMMAND_RESPONSE') {
        dispatch(transferOfCommandCompleted())
      }
      if (meta === 'EDUCATION_COMPLETED') {
        dispatch(educationCompleted())
      }
      dispatch(speakCompleted())
      setFinishedSpeaking(false)
    }
  }, [finishedSpeaking, textToSpeech, lastText, dispatch])

  return <div />
}

TextToSpeech.propTypes = {
  incomingText: PropTypes.object,
  meta: PropTypes.string
}

export default TextToSpeech
