import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import VideoLayout from './VideoLayout'
import AI from './AI/AI'
import ScrollingText from './ScrollingText/ScrollingText'
import Speak from './Speak/Speak'
import TextToSpeech from 'components/Evolution/Speak/TextToSpeech'
import Education from './Education/Education'
import Tips from './Tips/Tips'
import VideoPlayer from './VideoPlayer/VideoPlayer'
// import AdminPanel from './AdminPanel/AdminPanel'
import Evaluation from './Evaluation/Evaluation'
import { playlistFromId } from 'utils/video'
import { startTime } from 'store/actions/ai'
import RadioSound from 'components/Evolution/Transcribe/RadioSound'
import Speech2Text from 'components/Evolution/Transcribe/Speech2Text'

const Evolution = () => {
  const dispatch = useDispatch()
  const {
    firstAlarmAnnounced,
    faceToFaceCompleted,
    educationCompleted
  } = useSelector((state) => state.ai)
  const { alias } = useSelector((state) => state.evolution)
  const { showTips } = useSelector((state) => state.user)
  const [playlist, setPlaylist] = useState(false)

  useEffect(() => {
    if (alias !== '') {
      const pl = playlistFromId(alias)
      setPlaylist(pl)
      dispatch(startTime())
    }
  }, [alias, dispatch])

  return (
    <>
      {playlist && (
        <>
          {firstAlarmAnnounced && (
            <>
              <RadioSound />
              <Speech2Text />
            </>
          )}
          <AI />
          <Speak />
          <TextToSpeech />
          {!educationCompleted && (
            <VideoLayout>
              <ScrollingText />
              {firstAlarmAnnounced && showTips && <Tips />}
              <VideoPlayer playlist={playlist} />
            </VideoLayout>
          )}
          {faceToFaceCompleted && <Education />}
          {educationCompleted && <Evaluation />}
          {/* <AdminPanel /> */}
        </>
      )}
    </>
  )
}

export default Evolution
