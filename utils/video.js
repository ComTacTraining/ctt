const bucket = "https://comtac.s3-us-west-2.amazonaws.com"
const options = {
  autoplay: true,
  controls: true,
  fluid: true,
  // fill: true,
  aspectRatio: "16:9",
  preload: "auto",
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
    fullscreenToggle: true
  }
}

const playlistFromNames = names => {
  return names.map(name => {
    return {
      sources: [
        {
          src: `${bucket}/${name}/playlist.m3u8`,
          type: "application/x-mpegURL"
        }
      ]
    }
  })
}

const playlistFromId = evolutionId => {
  const category = evolutionId.match(/[a-zA-Z]+/g)[0]
  const id = evolutionId.match(/\d+/g)[0]
  const videoNames = [
    `${category}/${id}/intro`,
    "black",
    `approach/${Math.floor(Math.random() * 6 + 1)}`,
    `${category}/${id}/loop`,
    `${category}/${id}/bravo`,
    `${category}/${id}/charlie`,
    `${category}/${id}/delta`,
    `${category}/${id}/alpha`,
    `${category}/${id}/loop`,
    "black"
  ]
  return playlistFromNames(videoNames)
};

const guestPlaylist = () => {
  return playlistFromNames(["welcome", "instructions"])
}

const samplePlaylist = () => {
  return playlistFromNames(["sample1", "sample2"])
}

export { options, playlistFromNames, playlistFromId, guestPlaylist, samplePlaylist }