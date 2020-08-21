const bucket = 'https://comtac.s3-us-west-2.amazonaws.com';
const approaches = 6;
const options = {
  autoplay: true,
  controls: true,
  fluid: true,
  // fill: true,
  aspectRatio: '16:9',
  preload: 'auto',
  controlBar: {
    playToggle: false,
    volumePanel: true,
    pictureInPictureToggle: false,
    currentTimeDisplay: false,
    timeDivider: false,
    durationDisplay: false,
    progressControl: false,
    liveDisplay: false,
    seekToLive: false,
    remainingTimeDisplay: false,
    customControlSpacer: false,
    playbackRateMenuButton: false,
    chaptersButton: false,
    descriptionsButton: false,
    subsCapsButton: false,
    audioTrackButton: false,
    fullscreenToggle: true,
  },
};

const playlistFromNames = (names) => {
  return names.map((name) => {
    return {
      sources: [
        {
          src: `${bucket}/${name}/playlist.m3u8`,
          type: 'application/x-mpegURL',
        },
      ],
    };
  });
};

const playlistFromId = (evolutionId) => {
  const category = evolutionId.match(/[a-zA-Z]+/g)[0];
  const id = evolutionId.match(/\d+/g)[0];
  const approachId = Math.floor(Math.random() * approaches + 1);
  const videoNames = [
    `${category}/${id}/intro`,
    'black',
    `approach/${approachId}`,
    `${category}/${id}/loop`,
    `${category}/${id}/bravo`,
    `${category}/${id}/charlie`,
    `${category}/${id}/delta`,
    `${category}/${id}/alpha`,
    `${category}/${id}/loop`,
    'credits',
  ];
  return playlistFromNames(videoNames);
}

export { options, playlistFromNames, playlistFromId };
