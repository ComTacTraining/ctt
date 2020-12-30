import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import useVideoPlayer from 'hooks/useVideoPlayer'
import { samplePlaylist } from 'utils/video'

const useStyles = makeStyles(() => ({
  root: {
    "& .video-js.vjs-fill": {
      display: "block"
    },
    "& .vjs-big-play-button": {
      display: "none"
    }
  },
}))

const Home = ({ playlist }) => {
  const router = useRouter()
  const classes = useStyles()
  const { ref, player } = useVideoPlayer(() => {
    router.push('/demo')
  }, playlist)
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

export const getServerSideProps = async () => {
  const playlist = samplePlaylist()
  return {
    props: { playlist }
  }
}



export default Home