import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import useVideoPlayer from 'hooks/useVideoPlayer'
import { visitorPlaylist } from 'utils/video'
// import { samplePlaylist } from 'utils/video'

const useStyles = makeStyles(() => ({
  root: {
    "& .video-js.vjs-fill": {
      display: "block"
    },
    // "& .vjs-big-play-button": {
    //   display: "none"
    // }
  },
}))

const Home = () => {
  const router = useRouter()
  const classes = useStyles()
  const { ref, player } = useVideoPlayer(() => {
    router.push('/signup')
  }, visitorPlaylist())
  return (
    <>
      {!player && (
        <CircularProgress />
      )}
      <div className={classes.root} data-testid="videoplayer">
        <div data-vjs-player>
          <video ref={ref} className="video-js vjs-default-skin" />
        </div>
      </div>
    </>
  )
}

export default Home