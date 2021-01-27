import { UserContext } from 'components/Auth/UserContext'
import AdminPanel from 'components/Evolution/AdminPanel/AdminPanel'
import AI from 'components/Evolution/AI/AI'
import ScrollingText from 'components/Evolution/ScrollingText/ScrollingText'
import Speak from 'components/Evolution/Speak/Speak'
import Tips from 'components/Evolution/Tips/Tips'
import VideoLayout from 'components/Evolution/VideoLayout'
import VideoPlayer from 'components/Evolution/VideoPlayer/VideoPlayer'
import { useRouter } from 'next/router'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startTime } from 'store/actions/ai'
import { playlistFromId } from 'utils/video'

const Demo = () => {
  const { user }  = React.useContext(UserContext)
  const router = useRouter()
  const dispatch = useDispatch()
  const {
    firstAlarmAnnounced,
    faceToFaceCompleted,
  } = useSelector(state => state.ai)
  const [playlist, setPlaylist] = React.useState(false)

  React.useEffect(() => {
    const pl = playlistFromId('sfm23')
    setPlaylist(pl)
    dispatch(startTime())
  }, [dispatch])

  React.useEffect(() => {
    if (faceToFaceCompleted) {
      router.push('/subscribe')
    }
  }, [faceToFaceCompleted])

  return (
    <>
      {playlist && (
        <>
          <AI />
          <Speak />
          <VideoLayout>
            <ScrollingText />
            {firstAlarmAnnounced && <Tips />}
            <VideoPlayer playlist={playlist} />
          </VideoLayout>
          <AdminPanel />
        </>
      )}
    </>
  )
}

export default Demo
