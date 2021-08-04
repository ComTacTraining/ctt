import Backdrop from '@/components/Evolution/VideoPlayer/Backdrop'
import Screen from '@/components/Evolution/VideoPlayer/Screen'
import Loading from '@/components/UI/Loading'
import useVideoPlayer from '@/hooks/useVideoPlayer'
import { visitorPlaylist } from '@/utils/video'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'

const useStyles = makeStyles(() => ({
  root: {
    '& .video-js.vjs-fill': {
      display: 'block'
    }
  }
}))

const Home = () => {
  const router = useRouter()
  const classes = useStyles()
  const { ref, player } = useVideoPlayer(() => {
    router.push('/signup')
  }, visitorPlaylist())
  return (
    <>
      {!player && <Loading />}
      <Backdrop>
        <Screen>
          <div className={classes.root} data-testid='videoplayer'>
            <div data-vjs-player>
              <video ref={ref} className='video-js vjs-default-skin' />
            </div>
          </div>
        </Screen>
      </Backdrop>
    </>
  )
}

export default Home
