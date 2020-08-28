import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import videojs from 'video.js';
import qualityLevelsPlugin from 'videojs-contrib-quality-levels';
import httpSourceSelectorMutePlugin from 'videojs-http-source-selector-mute';
import vjsPlaylistPlugin from 'videojs-playlist';
import 'video.js/dist/video-js.min.css';
import * as aiActions from '../store/actions/ai';
import { options } from 'utils/video';

videojs.registerPlugin('vjsQualityLevels', qualityLevelsPlugin);
videojs.registerPlugin('vjsHttpSourceSelectorMute', httpSourceSelectorMutePlugin);
videojs.registerPlugin('vjsPlaylist', vjsPlaylistPlugin);

const useStyles = makeStyles((theme) => ({
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

const VideoPlayer = ({ playlist, onPlay, onPause, onEnded, onPlaylistEnded }) => {
  const dispatch = useDispatch();
  const ai = useSelector(state => state.ai);
  const { firstAlarmAnnounced, initialReportCompleted } = ai;
  const classes = useStyles();
  const videoRef = useRef();
  const [player, setPlayer] = useState();
  const [playlistLength, setPlaylistLength] = useState(0);

  useEffect(() => {
    setPlaylistLength(playlist.length);
    const vjsplayer = videojs(videoRef.current, options, () => {
      setPlayer(vjsplayer);
    });
    vjsplayer.vjsPlaylist(playlist);
    vjsplayer.playlist.autoadvance(0);
    vjsplayer.vjsQualityLevels();
    vjsplayer.vjsHttpSourceSelectorMute({ default: 'auto' });

    return () => vjsplayer.dispose();
  }, [playlist]);

  useEffect(() => {
    const play = () => {
      dispatch(aiActions.startTime());
      if (onPlay) {
        onPlay();
      }
    };

    const videoEnded = () => {
      const src = player.playlist.player_.currentSrc() || '';
      const parts = src.split('/');
      const currentVideo = parts[parts.length - 2];

      if (currentVideo === 'loop' || currentVideo === 'black') {
        const currId = player.playlist.currentItem();
        player.playlist.currentItem(currId);
        player.play();
      } else {
        if (currentVideo === 'alpha') {
          dispatch(aiActions.threeSixtyWalkthroughCompleted());
        }
        dispatch(aiActions.updateLastPlayedVideo(currentVideo));
      }

      if (onEnded) {
        onEnded();
      }
      
      if (onPlaylistEnded && player.playlist.currentItem() === playlistLength - 1) {
        onPlaylistEnded();
      }
    };

    if (player) {
      player.on('play', () => play());
      onPause && player.on('pause', () => onPause());
      (onEnded || onPlaylistEnded) && player.on('ended', () => videoEnded());
    }
  }, [player, playlistLength, onPlay, onPause, onEnded, onPlaylistEnded, dispatch]);

  useEffect(() => {
    if (firstAlarmAnnounced) {
      const currId = player.playlist.currentItem();
      player.playlist.currentItem(currId + 1);
      player.play();
    }
  }, [player, firstAlarmAnnounced]);

  useEffect(() => {
    if (initialReportCompleted) {
      const currId = player.playlist.currentItem();
      player.playlist.currentItem(currId + 1);
      player.play();
    }
  }, [player, initialReportCompleted]);

  return (
    <div className={classes.root} data-testid='videoplayer'>
      <div data-vjs-player>
        <video ref={videoRef} className='video-js vjs-default-skin' />
      </div>
    </div>
  );
};

export default VideoPlayer;
