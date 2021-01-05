import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import VideoLayout from 'components/Evolution/VideoLayout'
import AI from 'components/Evolution/AI/AI'
import ScrollingText from 'components/Evolution/ScrollingText/ScrollingText'
import Speak from 'components/Evolution/Speak/Speak'
import KeyMapping from 'components/Evolution/KeyMapping/KeyMapping'
import Tips from 'components/Evolution/Tips/Tips'
import VideoPlayer from 'components/Evolution/VideoPlayer/VideoPlayer'
import AdminPanel from 'components/Evolution/AdminPanel/AdminPanel'
import { playlistFromId } from 'utils/video'
import { startTime } from 'store/actions/ai'

const Evolution = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    firstAlarmAnnounced,
    faceToFaceCompleted,
  } = useSelector(state => state.ai)
  const { id } = useSelector(state => state.evolution)
  const { showTips } = useSelector(state => state.user)
  const [playlist, setPlaylist] = useState(false)

  useEffect(() => {
    if (id) {
      setPlaylist(playlistFromId(id))
      dispatch(startTime())
    }
  }, [id, dispatch])

  useEffect(() => {
    if (faceToFaceCompleted) {
      router
    }
  }, [faceToFaceCompleted])

  return (
    <>
      {playlist && (
        <>
          <AI />
          <Speak />
          <KeyMapping />
          {!educationCompleted && (
            <VideoLayout>
              <ScrollingText />
              {firstAlarmAnnounced && showTips && <Tips />}
              <VideoPlayer playlist={playlist} />
            </VideoLayout>
          )}
          <AdminPanel />
        </>
      )}
    </>
  )
}

export default Evolution
