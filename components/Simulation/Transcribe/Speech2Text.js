import {
  downsampleBuffer,
  pcmEncode
} from '@/components/Simulation/Transcribe/audioUtils'
import { blankBuffer } from '@/components/Simulation/Transcribe/blankBuffer'
import useKeyPress from '@/hooks/useKeyPress'
import * as commandActions from '@/store/actions/command'
import { addToLog } from '@/store/actions/review'
import * as marshaller from '@aws-sdk/eventstream-marshaller'
import * as util_utf8_node from '@aws-sdk/util-utf8-node'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import mic from 'microphone-stream'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useWebSocket, { ReadyState } from 'react-use-websocket'

const eventStreamMarshaller = new marshaller.EventStreamMarshaller(
  util_utf8_node.toUtf8,
  util_utf8_node.fromUtf8
)

const languageCode = 'en-US'
const region = 'us-east-1'
const sampleRate = 44100

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

const Speech2Text = () => {
  const dispatch = useDispatch()
  const { firstOnScene } = useSelector((state) => state.user)
  const { isDemo } = useSelector((state) => state.evolution)
  const { showTips } = useSelector((state) => state.user)
  const isPressed = useKeyPress('Space')
  const [open, setOpen] = React.useState(false)
  const [lastTranscript, setLastTranscript] = React.useState('')
  const [currentTranscript, setCurrentTranscript] = React.useState('')
  const [bot, setBot] = React.useState('')

  const didUnmount = React.useRef(false)
  const inputSampleRate = React.useRef(0)
  const micStream = React.useRef(null)
  const [audioBinary, setAudioBinary] = React.useState()

  const sendTestMsgTimer = React.useRef(null)
  const recordingTime = React.useRef(null)
  const testBuffer = React.useMemo(() => {
    const testMessage = getAudioEventMessage(Buffer.from(new Buffer([0])))
    return eventStreamMarshaller.marshall(testMessage)
  }, [])
  const { firstAlarmAnnounced } = useSelector((state) => state.ai)
  const { isRecordingMicrophone, commandAllowed } = useSelector(
    (state) => state.command
  )

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
    } catch (error) {
      console.log(`[Web Socket Error | API URL] ${error.message}`)
      return null
    }
  }, [])

  const { sendMessage, readyState, getWebSocket } = useWebSocket(getSocketUrl, {
    onMessage: (message) => {
      if (message.data instanceof ArrayBuffer) {
        let messageWrapper = eventStreamMarshaller.unmarshall(
          Buffer(message.data)
        )
        let messageBody = JSON.parse(
          String.fromCharCode.apply(String, messageWrapper.body)
        )
        if (messageWrapper.headers[':message-type'].value === 'event') {
          handleEventStreamMessage(messageBody)
        }
      }
    },
    onError: (message) => {
      console.log(`[Web Socket Error | General] ${message}`)
    },
    shouldReconnect: (closeEvent) => {
      if (closeEvent.reason === 'didUnmount' && closeEvent.code === 3333) {
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
    LISTENING: 'Listening now ...',
    PRESSKEY: 'Press the space bar to speak.',
    WAITING: 'Please wait while connecting...'
  }

  React.useEffect(() => {
    return () => {
      getWebSocket().close(3333, 'didUnmount')
      closeSocket()
      didUnmount.current = true
      if (sendTestMsgTimer.current) {
        clearInterval(sendTestMsgTimer.current)
      }
    }
  }, [])

  React.useEffect(() => {
    if (connectionStatus === 'Open') {
      getWebSocket().binaryType = 'arraybuffer'
      if (bot !== BOTSTATE.PROCESSING && bot !== BOTSTATE.PRESSKEY) {
        setBot(BOTSTATE.PRESSKEY)
      }

      if (
        commandAllowed &&
        isPressed &&
        !isRecordingMicrophone &&
        bot !== BOTSTATE.LISTENING
      ) {
        dispatch(commandActions.startRecordingMicrophone())
        setBot(BOTSTATE.LISTENING)
      } else if (
        !isPressed &&
        isRecordingMicrophone &&
        bot !== BOTSTATE.PROCESSING
      ) {
        setBot(BOTSTATE.PROCESSING)
        setBot(BOTSTATE.PRESSKEY)
        dispatch(commandActions.stopRecordingMicrophone())
      }
    } else if (bot !== BOTSTATE.WAITING) {
      setBot(BOTSTATE.WAITING)
    }
  }, [firstAlarmAnnounced, readyState, isPressed, commandAllowed])

  React.useEffect(() => {
    if (isRecordingMicrophone && (isDemo || (!isDemo && !showTips))) {
      dispatch(
        commandActions.updatePartialTranscript(
          lastTranscript + ' ' + currentTranscript
        )
      )
    } else {
      if (micStream.current) {
        micStream.current.stop()
      }
      for (let i = 0; i < 20; i++) {
        sendMessage(blankBuffer)
      }
      const _lastTranscript = lastTranscript
      const _currentTranscript = currentTranscript
      if (_lastTranscript !== '' && _currentTranscript === '') {
        if (recordingTime.current > 200) {
          dispatch(
            commandActions.updateCompletedTranscript(
              _lastTranscript + ' ' + _currentTranscript
            )
          )
          dispatch(
            addToLog({
              timestamp: Date.now(),
              label: firstOnScene,
              text: _lastTranscript + ' ' + _currentTranscript
            })
          )
        }

        setCurrentTranscript('')
        setLastTranscript('')
      } else if (
        (lastTranscript || currentTranscript) &&
        (isDemo || (!isDemo && showTips))
      ) {
        if (recordingTime.current > 200) {
          dispatch(
            commandActions.updatePartialTranscript(
              `${lastTranscript} ${currentTranscript}`.trim()
            )
          )
        } else {
          setCurrentTranscript('')
          setLastTranscript('')
        }
      }
    }
  }, [
    isDemo,
    showTips,
    isRecordingMicrophone,
    lastTranscript,
    currentTranscript
  ])

  React.useEffect(() => {
    sendMessage(audioBinary)
  }, [audioBinary])

  React.useEffect(() => {
    if (isRecordingMicrophone) {
      recordingTime.current = Date.now()
      if (sendTestMsgTimer.current) {
        clearInterval(sendTestMsgTimer.current)
      }
      window.navigator.mediaDevices
        .getUserMedia({
          video: false,
          audio: true
        })
        .then(streamAudioToWebSocket)
        .catch(function (error) {
          console.log('[Web Socket Error | Permissions] ', error)
          setOpen(true)
        })
    } else {
      recordingTime.current = Date.now() - recordingTime.current
      if (micStream.current) {
        micStream.current.stop()
      }
      if (connectionStatus === 'Open' || connectionStatus === 'Connecting') {
        sendTestMsgTimer.current = setInterval(() => {
          sendMessage(testBuffer)
        }, 5000)
      }
    }
  }, [isRecordingMicrophone])

  const handleClose = () => {
    setOpen(false)
  }

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

  const closeSocket = React.useCallback(() => {
    if (micStream.current) {
      micStream.current.stop()
    }
    if (connectionStatus === 'Open' || connectionStatus === 'Connecting') {
      let emptyMessage = getAudioEventMessage(Buffer.from(new Buffer([])))
      let emptyBuffer = eventStreamMarshaller.marshall(emptyMessage)
      sendMessage(emptyBuffer)
    }
  }, [connectionStatus])

  return (
    <div id='speech-text'>
      <span style={{ display: 'none' }}>{bot}</span>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {'Voice Search turned off?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            There was an error streaming your audio to Amazon Transcribe. You
            have to refersh or allow to access the microphone.
            <a
              link='details'
              onClick={handleClose}
              target='_blank'
              href='https://support.google.com/chrome/?p=ui_voice_search&amphl=en-US'>
              Details
            </a>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Speech2Text
