import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import videojs from 'video.js';
import qualityLevelsPlugin from 'videojs-contrib-quality-levels';
import httpSourceSelectorMutePlugin from 'videojs-http-source-selector-mute';
import vjsPlaylistPlugin from 'videojs-playlist';
import 'video.js/dist/video-js.min.css';
import * as aiActions from 'store/actions/ai';
import { toggleFullscreen } from 'store/actions/user';
import { options } from 'utils/video';

videojs.registerPlugin('vjsQualityLevels', qualityLevelsPlugin);
videojs.registerPlugin('vjsHttpSourceSelectorMute', httpSourceSelectorMutePlugin);
videojs.registerPlugin('vjsPlaylist', vjsPlaylistPlugin);

const useStyles = makeStyles(() => ({
  root: {
    '& .video-js.vjs-fill': {
      display: 'block',
    },
    '& .vjs-big-play-button': {
      display: 'none',
    },
  },
  hidden: {
    width: '1px',
    height: '1px'
  }
}));

const VideoPlayer = ({ playlist, onPlaylistEnded }) => {
  const dispatch = useDispatch();
  const { 
    firstAlarmAnnounced, 
    threeSixtyWalkthroughBegan: start360, 
    threeSixtyWalkthroughCompleted: end360,
    faceToFaceCompleted 
  } = useSelector(state => state.ai);
  const classes = useStyles();
  const videoRef = useRef();
  const [player, setPlayer] = useState();
  const [playlistLength, setPlaylistLength] = useState(0);
  const [lastVideo, setLastVideo] = useState('');

  useEffect(() => {
    setPlaylistLength(playlist.length);
    const vjsplayer = videojs(videoRef.current, options, () => {
      setPlayer(vjsplayer);
    });
    vjsplayer.volume(0.2);
    vjsplayer.vjsPlaylist(playlist);
    vjsplayer.playlist.autoadvance(0);
    vjsplayer.vjsQualityLevels();
    vjsplayer.vjsHttpSourceSelectorMute({ default: 'low' });

    return () => vjsplayer.dispose();
  }, [playlist]);

  useEffect(() => {
    const videoFullScreen = () => {
      dispatch(toggleFullscreen());
    };
    if (player) {
      player.on('fullscreenchange', () => videoFullScreen());
    }
  }, [player, dispatch]);

  useEffect(() => {
    const videoEnded = () => {
      const src = player.playlist.player_.currentSrc() || '';
      const parts = src.split('/');
      const currentVideo = parts[parts.length - 2];
      setLastVideo(currentVideo);

      if (currentVideo === 'loop' || currentVideo === 'black') {
        const currId = player.playlist.currentItem();
        player.playlist.currentItem(currId);
        player.play();
      }

      if (onPlaylistEnded && player.playlist.currentItem() === playlistLength - 1) {
        onPlaylistEnded();
      }
    }
    if (player) {
      player.on('ended', () => videoEnded());
    }
  }, [player, playlistLength, onPlaylistEnded]);

  useEffect(() => {
    if (lastVideo) {
      dispatch(aiActions.updateLastPlayedVideo(lastVideo));
    }
  }, [lastVideo, dispatch]);

  useEffect(() => {
    if (firstAlarmAnnounced && lastVideo === 'black') {
      const currId = player.playlist.currentItem();
      player.playlist.currentItem(currId + 1);
      player.play();
    }
  }, [lastVideo, player, firstAlarmAnnounced]);

  useEffect(() => {
    if (start360 && !end360 && lastVideo === 'loop') {
      const currId = player.playlist.currentItem();
      player.playlist.currentItem(currId + 1);
      player.play();
    }
  }, [lastVideo, player, start360, end360]);

  useEffect(() => {
    if (faceToFaceCompleted && lastVideo === 'loop') {
      const currId = player.playlist.currentItem();
      player.playlist.currentItem(currId + 1);
      player.play();
    }
  }, [lastVideo, player, faceToFaceCompleted]);

  return (
    <div className={classes.root} data-testid='videoplayer'>
      <div data-vjs-player>
        <video ref={videoRef} className='video-js vjs-default-skin' />
      </div>
    </div>
  );
};

export default VideoPlayer;
