import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as util_utf8_node from '@aws-sdk/util-utf8-node'
import * as marshaller from '@aws-sdk/eventstream-marshaller'
import mic from 'microphone-stream'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { pcmEncode, downsampleBuffer } from './audioUtils'
import useKeyPress from 'hooks/useKeyPress'
import * as aiActions from 'store/actions/ai'

const eventStreamMarshaller = new marshaller.EventStreamMarshaller(
  util_utf8_node.toUtf8,
  util_utf8_node.fromUtf8
)

const languageCode = 'en-US'
const region = 'us-east-1'
const sampleRate = 44100

const Speech2Text = () => {
  const dispatch = useDispatch()
  const { firstOnScene, usingMic } = useSelector((state) => state.user)
  const isPressed = useKeyPress('Space')
  //   const [languageCode, setLanguageCode] = React.useState('en-US')
  //   const [region, setRegion] = React.useState('us-east-1')
  //   const [sampleRate, setSampleRate] = React.useState(44100)

  const [lastTranscript, setLastTranscript] = React.useState('')
  const [currentTranscript, setCurrentTranscript] = React.useState('')

  const didUnmount = React.useRef(false)
  const inputSampleRate = React.useRef(0)
  const micStream = React.useRef(null)
  const [audioBinary, setAudioBinary] = React.useState()

  const {
    firstAlarmAnnounced,
    speechBotState,
    isRecordingMicrophone,
    radioInUse
  } = useSelector((state) => state.ai)

  const getSocketUrl = React.useCallback(async () => {
    try {
      const response = await fetch('/api/member/voiceurl', {
        method: 'POST',
        mode: 'same-origin',
        body: JSON.stringify({
          region: region,
          languageCode: languageCode,
          sampleRate: sampleRate
        })
      })

      const resUrl = await response.json()
      return resUrl.url
    } catch {
      console.log("can't make websocket url")
      return null
    }
  }, [])

  const {
    sendMessage,
    // sendJsonMessage,
    // lastMessage,
    // lastJsonMessage,
    readyState,
    getWebSocket
  } = useWebSocket(getSocketUrl, {
    onOpen: () => {
      console.log('websocket opened')
    },
    onClose: (closeEvent) => {
      console.log('websocket closed ');
    },
    onMessage: (message) => {
      let messageWrapper = eventStreamMarshaller.unmarshall(
        Buffer(message.data)
      )
      let messageBody = JSON.parse(
        String.fromCharCode.apply(String, messageWrapper.body)
      )
      if (messageWrapper.headers[':message-type'].value === 'event') {
        handleEventStreamMessage(messageBody)
      } else {
        console.log(messageBody.Message)
      }
    },
    onError: (message) => {
      if (message) {
        console.log('WS connection error', message)
      } else {
        console.log('WS connecetion error')
      }
    },
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => {
      if(closeEvent.reason === "didUnmount" && closeEvent.code === 3333) {
        return false
      } else {
        return didUnmount.current === false
      }
    },
    reconnectAttempts: 10000,
    reconnectInterval: 1000
  })

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated'
  }[readyState]

  const BOTSTATE = {
    PROCESSING: 'Processing ...',
    LISTENINIG: 'Listening now ...',
    PRESSKEY: 'Press the space bar to speak.',
    WAITING: 'Please wait while connecting...'
  }

  React.useEffect(() => {
    return () => {
      getWebSocket().close(3333, "didUnmount")
      closeSocket()
      didUnmount.current = true
    }
  }, [])

  React.useEffect(() => {
    if (usingMic) {
      if (connectionStatus === 'Open') {
        getWebSocket().binaryType = 'arraybuffer'
        if (
          speechBotState !== BOTSTATE.PROCESSING &&
          speechBotState !== BOTSTATE.PRESSKEY
        ) {
          dispatch(aiActions.updateSpeechBotState(BOTSTATE.PRESSKEY))
        }

        if (
          firstAlarmAnnounced &&
          isPressed &&
          !isRecordingMicrophone &&
          speechBotState !== BOTSTATE.LISTENINIG &&
          !radioInUse
        ) {
          dispatch(aiActions.startRecordingMicrophone())
          dispatch(aiActions.updateSpeechBotState(BOTSTATE.LISTENINIG))
        } else if (
          !isPressed &&
          isRecordingMicrophone &&
          speechBotState !== BOTSTATE.PROCESSING
        ) {
          dispatch(aiActions.updateSpeechBotState(BOTSTATE.PROCESSING))
          setTimeout(() => {
            dispatch(aiActions.updateSpeechBotState(BOTSTATE.PRESSKEY))
            dispatch(aiActions.stopRecordingMicrophone())
          }, 2000)

        }
      } else if (speechBotState !== BOTSTATE.WAITING) {
        dispatch(aiActions.updateSpeechBotState(BOTSTATE.WAITING))
      }
    }
  }, [firstAlarmAnnounced, usingMic, readyState, isPressed])

  React.useEffect(() => {
    if (isRecordingMicrophone) {
      dispatch(
        aiActions.updatePartialTranscript(
          lastTranscript + ' ' + currentTranscript
        )
      )
    } else {
      if (lastTranscript !== '' || currentTranscript !== '') {
        dispatch(
          aiActions.updateCompletedTranscript(
            lastTranscript + ' ' + currentTranscript
          )
        )
        dispatch(
          aiActions.addToLog({
            timestamp: Date.now(),
            label: firstOnScene,
            text: lastTranscript
          })
        )
        setLastTranscript('')
        setCurrentTranscript('')
      }
    }
  }, [isRecordingMicrophone, lastTranscript, currentTranscript])

  React.useEffect(() => {
    sendMessage(audioBinary)
  }, [audioBinary])

  React.useEffect(() => {
    if (isRecordingMicrophone) {
      window.navigator.mediaDevices
        .getUserMedia({
          video: false,
          audio: true
        })
        .then(streamAudioToWebSocket)
        .catch(function (error) {
          alert(
            'There was an error streaming your audio to Amazon Transcribe. Please try again.'
          )
        })
    } else {
      if (micStream.current) {
        micStream.current.stop()
      }
    }
  }, [isRecordingMicrophone])

  const handleEventStreamMessage = (messageJson) => {
    let results = messageJson.Transcript.Results

    if (results.length > 0) {
      if (results[0].Alternatives.length > 0) {
        let transcript = results[0].Alternatives[0].Transcript

        transcript = decodeURIComponent(escape(transcript))
        setCurrentTranscript(transcript)
        if (!results[0].IsPartial) {
          setLastTranscript(
            (prevLastTranscript) => prevLastTranscript + ' ' + transcript
          )
          setCurrentTranscript('')
        }
      }
    }
  }

  const streamAudioToWebSocket = async (userMediaStream) => {
    micStream.current = new mic()

    micStream.current.on('format', (data) => {
      inputSampleRate.current = data.sampleRate
    })

    micStream.current.setStream(userMediaStream)

    micStream.current.on('data', (rawAudioChunk) => {
      let binary = convertAudioToBinaryMessage(rawAudioChunk)
      setAudioBinary(binary)
    })
  }

  const convertAudioToBinaryMessage = (audioChunk) => {
    let raw = mic.toRaw(audioChunk)

    if (raw == null) return

    let downsampledBuffer = downsampleBuffer(
      raw,
      inputSampleRate.current,
      sampleRate
    )
    let pcmEncodedBuffer = pcmEncode(downsampledBuffer)

    let audioEventMessage = getAudioEventMessage(Buffer.from(pcmEncodedBuffer))

    let binary = eventStreamMarshaller.marshall(audioEventMessage)

    return binary
  }

  const getAudioEventMessage = (buffer) => {
    return {
      headers: {
        ':message-type': {
          type: 'string',
          value: 'event'
        },
        ':event-type': {
          type: 'string',
          value: 'AudioEvent'
        }
      },
      body: buffer
    }
  }
  const closeSocket = React.useCallback(() => {
    if (micStream.current) {
      micStream.current.stop()
    }
    if (connectionStatus === 'Open' || connectionStatus === 'Connecting') {
      let emptyMessage = getAudioEventMessage(Buffer.from(new Buffer([])))
      let emptyBuffer = eventStreamMarshaller.marshall(emptyMessage)
      sendMessage(emptyBuffer)
    }
  }, [connectionStatus]);

  return <div id='speech-text'></div>
}

export default Speech2Text
