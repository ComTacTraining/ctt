import { options } from '@/utils/video'
import { useEffect, useRef, useState } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.min.css'
import qualityLevelsPlugin from 'videojs-contrib-quality-levels'
import httpSourceSelectorMutePlugin from 'videojs-http-source-selector-mute'
import vjsPlaylistPlugin from 'videojs-playlist'

const useVideoPlayer = (callback, playlist) => {
  const ref = useRef()
  const [player, setPlayer] = useState(null)
  const [lastVideo, setLastVideo] = useState('')

  useEffect(() => {
    if (ref.current && playlist.length > 0) {
      videojs.registerPlugin('vjsQualityLevels', qualityLevelsPlugin)
      videojs.registerPlugin(
        'vjsHttpSourceSelectorMute',
        httpSourceSelectorMutePlugin
      )
      videojs.registerPlugin('vjsPlaylist', vjsPlaylistPlugin)

      let vjsplayer = videojs(ref.current, options, () => {
        vjsplayer.volume(0.8)
        vjsplayer.vjsPlaylist(playlist)
        vjsplayer.vjsQualityLevels()
        vjsplayer.vjsHttpSourceSelectorMute({ default: 'low' })
        vjsplayer.playlist.autoadvance(0)
      })
      setPlayer(vjsplayer)
      return () => vjsplayer.dispose()
    }
  }, [])

  useEffect(() => {
    if (player) {
      player.playlist(playlist)
    }
  }, [player, playlist])

  useEffect(() => {
    const videoEnded = () => {
      const src = player.playlist.player_.currentSrc() || ''
      const parts = src.split('/')
      const currentVideo = parts[parts.length - 2]
      setLastVideo(currentVideo)
      if (player.playlist.currentItem() === playlist.length - 1) {
        callback()
      }
    }
    if (player) {
      player.on('ended', () => videoEnded())
    }
  }, [player])

  return { ref, player, lastVideo }
}

export default useVideoPlayer
