import Dialog from '@/components/UI/Dialog'
import { startTime } from '@/store/actions/review'
import { updateLastPlayedVideo } from '@/store/actions/screen'
import { setPermissionGranted, updateMasterVolume } from '@/store/actions/user'
import { options, playlistFromId } from '@/utils/video'
import { makeStyles } from '@material-ui/core/styles'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import videojs from 'video.js'
import 'video.js/dist/video-js.min.css'
import qualityLevelsPlugin from 'videojs-contrib-quality-levels'
import httpSourceSelectorMutePlugin from 'videojs-http-source-selector-mute'
import vjsPlaylistPlugin from 'videojs-playlist'

const useStyles = makeStyles(() => ({
  root: {
    display: 'relative'
  },
  player: {
    '& .video-js.vjs-fill': {
      display: 'block'
    },
    '& .vjs-fullscreen-control': {
      display: 'none'
    }
  }
}))

const VideoPlayer = () => {
  const dispatch = useDispatch()
  const {
    firstAlarmAnnounced,
    threeSixtyWalkthroughBegan: start360,
    threeSixtyWalkthroughCompleted: end360,
    educationCompleted
  } = useSelector((state) => state.ai)
  const { masterVolume, permissionGranted } = useSelector((state) => state.user)
  const { alias, isDemo } = useSelector((state) => state.evolution)
  const classes = useStyles()
  const videoRef = React.useRef()
  const [player, setPlayer] = React.useState(null)
  const [playlistLength, setPlaylistLength] = React.useState(0)
  const [lastVideo, setLastVideo] = React.useState('')
  const [playlist, setPlaylist] = React.useState(null)
  const [showDialog, setShowDialog] = React.useState(false)

  React.useEffect(() => {
    if (player && permissionGranted) {
      player.play()
    }
  }, [player, permissionGranted])

  React.useEffect(() => {
    const providePlaylist = (id) => {
      const playlist = playlistFromId(id)
      setPlaylist(playlist)
      dispatch(startTime())
    }
    if (isDemo || alias !== '') {
      const id = isDemo ? 'sfm23' : alias
      providePlaylist(id)
    }
  }, [isDemo, alias, dispatch])

  React.useEffect(() => {
    const playlistLoaded = () => {
      if (!videojs.getPlugin('vjsQualityLevels')) {
        videojs.registerPlugin('vjsQualityLevels', qualityLevelsPlugin)
      }
      if (!videojs.getPlugin('vjsHttpSourceSelectorMute')) {
        videojs.registerPlugin(
          'vjsHttpSourceSelectorMute',
          httpSourceSelectorMutePlugin
        )
      }
      if (!videojs.getPlugin('vjsPlaylist')) {
        videojs.registerPlugin('vjsPlaylist', vjsPlaylistPlugin)
      }

      setPlaylistLength(playlist.length)
      const tempPlayer = videojs(videoRef.current, options, () => {
        setPlayer(tempPlayer)
      })
      tempPlayer.volume(masterVolume)
      tempPlayer.vjsPlaylist(playlist)
      tempPlayer.playlist.autoadvance(0)
      tempPlayer.vjsQualityLevels()
      tempPlayer.vjsHttpSourceSelectorMute({ default: 'low' })

      return () => {
        if (tempPlayer) {
          tempPlayer.dispose()
        }
      }
    }

    if (playlist) {
      playlistLoaded()
    }
  }, [playlist])

  React.useEffect(() => {
    const videoEnded = () => {
      const src = player.playlist.player_.currentSrc() || ''
      const parts = src.split('/')
      const currentVideo = parts[parts.length - 2]
      setLastVideo(currentVideo)

      if (currentVideo === 'loop' || currentVideo === 'black') {
        const currId = player.playlist.currentItem()
        player.playlist.currentItem(currId)
        player.play()
      }
    }

    const volumeChanged = () => {
      dispatch(updateMasterVolume(player.volume()))
    }

    const requireMicAccess = () => {
      player.pause()
      const permissions = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      })
      permissions
        .then((stream) => {
          dispatch(setPermissionGranted())
          stream.getTracks().forEach((track) => track.stop())
        })
        .catch((err) => {
          console.log(err)
          setShowDialog(true)
        })
    }

    if (player) {
      player.bigPlayButton.on('click', () => requireMicAccess())
      player.on('ended', () => videoEnded())
      player.on('volumechange', () => volumeChanged())
    }
  }, [player, playlistLength])

  React.useEffect(() => {
    if (lastVideo) {
      dispatch(updateLastPlayedVideo(lastVideo))
    }
  }, [lastVideo, dispatch])

  React.useEffect(() => {
    if (player && lastVideo === '' && firstAlarmAnnounced) {
      const id = educationCompleted ? 9 : end360 ? 8 : start360 ? 4 : 3
      player.playlist.currentItem(id)
      player.play()
    }
  }, [
    player,
    lastVideo,
    firstAlarmAnnounced,
    start360,
    end360,
    educationCompleted
  ])

  React.useEffect(() => {
    if (firstAlarmAnnounced && lastVideo === 'black') {
      const currId = player.playlist.currentItem()
      player.playlist.currentItem(currId + 1)
      player.play()
    }
  }, [lastVideo, player, firstAlarmAnnounced])

  React.useEffect(() => {
    if (start360 && !end360 && lastVideo === 'loop') {
      const currId = player.playlist.currentItem()
      player.playlist.currentItem(currId + 1)
      player.play()
    }
  }, [lastVideo, player, start360, end360])

  React.useEffect(() => {
    if (educationCompleted && lastVideo === 'loop') {
      const currId = player.playlist.currentItem()
      player.playlist.currentItem(currId + 1)
      player.play()
    }
  }, [lastVideo, player, educationCompleted])

  return (
    <div className={classes.root}>
      <div className={classes.player} data-testid='videoplayer'>
        <div data-vjs-player>
          <video
            ref={videoRef}
            className='video-js vjs-default-skin vjs-big-play-centered'
          />
        </div>
      </div>
      {showDialog && (
        <Dialog
          title='Microphone Access'
          text='We are not able to access your mic. Please click the lock icon in your url bar and set Microphone to "Allow"'
        />
      )}
    </div>
  )
}

export default VideoPlayer
