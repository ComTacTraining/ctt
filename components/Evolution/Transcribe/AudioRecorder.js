import mic from 'microphone-stream'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const AudioRecorder = ({ finishRecording }) => {
  const { isRecordingMicrophone } = useSelector((state) => state.command)
  const [recording, setRecording] = useState(false)
  const [micStream, setMicStream] = useState()
  const [audioBuffer] = useState(
    (() => {
      let buffer = []
      const add = (raw) => {
        buffer = buffer.concat(...raw)
        return buffer
      }
      const newBuffer = () => {
        console.log('resetting buffer')
        buffer = []
      }

      return {
        reset: () => {
          newBuffer()
        },
        addData: (raw) => {
          return add(raw)
        },
        getData: () => {
          return buffer
        }
      }
    })()
  )

  useEffect(() => {
    const startRecording = async () => {
      console.log('start recording')
      audioBuffer.reset()

      window.navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          const startMic = new mic()

          startMic.setStream(stream)
          startMic.on('data', (chunk) => {
            var raw = mic.toRaw(chunk)
            if (raw == null) {
              return
            }
            audioBuffer.addData(raw)
          })

          setRecording(true)
          setMicStream(startMic)
        })
    }

    const stopRecording = async () => {
      console.log('stop recording')
      const timer = Date.now()

      micStream.stop()
      setMicStream(null)
      setRecording(false)

      const resultBuffer = audioBuffer.getData()

      if (typeof finishRecording === 'function') {
        finishRecording(resultBuffer, timer)
      }
    }
    if (!recording && isRecordingMicrophone) {
      startRecording()
    } else if (recording && !isRecordingMicrophone) {
      stopRecording()
    }
  }, [
    isRecordingMicrophone,
    recording,
    micStream,
    audioBuffer,
    finishRecording
  ])

  return <div className='audioRecorder'></div>
}

AudioRecorder.propTypes = {
  finishRecording: PropTypes.func
}

export default AudioRecorder
