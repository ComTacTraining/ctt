import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateLastPlayedVideo } from 'store/actions/screen'
import { updateMasterVolume } from 'store/actions/user'
import { options } from 'utils/video'
import videojs from 'video.js'
import 'video.js/dist/video-js.min.css'
import qualityLevelsPlugin from 'videojs-contrib-quality-levels'
import httpSourceSelectorMutePlugin from 'videojs-http-source-selector-mute'
import vjsPlaylistPlugin from 'videojs-playlist'

const useStyles = makeStyles(() => ({
  root: {
    '& .video-js.vjs-fill': {
      display: 'block'
    },
    '& .vjs-big-play-button': {
      display: 'none'
    },
    '& .vjs-fullscreen-control': {
      display: 'none'
    }
  },
  hidden: {
    width: '1px',
    height: '1px'
  }
}))

const VideoPlayer = ({ playlist, onPlaylistEnded }) => {
  const dispatch = useDispatch()
  const {
    firstAlarmAnnounced,
    threeSixtyWalkthroughBegan: start360,
    threeSixtyWalkthroughCompleted: end360,
    educationCompleted
  } = useSelector((state) => state.ai)
  const { masterVolume } = useSelector((state) => state.user)
  const classes = useStyles()
  const videoRef = useRef()
  const [player, setPlayer] = useState()
  const [playlistLength, setPlaylistLength] = useState(0)
  const [lastVideo, setLastVideo] = useState('')

  useEffect(() => {
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
    const vjsplayer = videojs(videoRef.current, options, () => {
      setPlayer(vjsplayer)
    })
    vjsplayer.volume(masterVolume)
    vjsplayer.vjsPlaylist(playlist)
    vjsplayer.playlist.autoadvance(0)
    vjsplayer.vjsQualityLevels()
    vjsplayer.vjsHttpSourceSelectorMute({ default: 'low' })

    return () => {
      if (vjsplayer) {
        // vjsplayer.vjsQualityLevels().dispose()
        // vjsplayer.vjsHttpSourceSelectorMute().dispose()
        // vjsplayer.vjsPlaylist().dispose()
        vjsplayer.dispose()
      }
    }
  }, [playlist])

  useEffect(() => {
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

      if (
        onPlaylistEnded &&
        player.playlist.currentItem() === playlistLength - 1
      ) {
        onPlaylistEnded()
      }
    }

    const volumeChanged = () => {
      dispatch(updateMasterVolume(player.volume()))
    }

    if (player) {
      player.on('ended', () => videoEnded())
      player.on('volumechange', () => volumeChanged())
    }
  }, [player, playlistLength, onPlaylistEnded])

  useEffect(() => {
    if (lastVideo) {
      dispatch(updateLastPlayedVideo(lastVideo))
    }
  }, [lastVideo, dispatch])

  useEffect(() => {
    if (player && lastVideo === '' && firstAlarmAnnounced) {
      const id = educationCompleted ? 9 : end360 ? 8 : start360 ? 4 : 3
      // console.log(id)
      // const currId = player.playlist.currentItem()
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

  useEffect(() => {
    if (firstAlarmAnnounced && lastVideo === 'black') {
      const currId = player.playlist.currentItem()
      player.playlist.currentItem(currId + 1)
      player.play()
    }
  }, [lastVideo, player, firstAlarmAnnounced])

  useEffect(() => {
    if (start360 && !end360 && lastVideo === 'loop') {
      const currId = player.playlist.currentItem()
      player.playlist.currentItem(currId + 1)
      player.play()
    }
  }, [lastVideo, player, start360, end360])

  useEffect(() => {
    if (educationCompleted && lastVideo === 'loop') {
      const currId = player.playlist.currentItem()
      player.playlist.currentItem(currId + 1)
      player.play()
    }
  }, [lastVideo, player, educationCompleted])

  return (
    <div className={classes.root} data-testid='videoplayer'>
      <div data-vjs-player>
        <video ref={videoRef} className='video-js vjs-default-skin' />
      </div>
    </div>
  )
}

VideoPlayer.propTypes = {
  playlist: PropTypes.array,
  onPlaylistEnded: PropTypes.func
}

export default VideoPlayer
