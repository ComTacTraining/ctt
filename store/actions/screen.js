export const UPDATE_LAST_PLAYED_VIDEO = 'UPDATE_LAST_PLAYED_VIDEO'
export const ADD_OVERLAY_TITLE = 'ADD_OVERLAY_TITLE'
export const UPDATE_SCROLLING_TEXT = 'UPDATE_SCROLLING_TEXT'
export const SCROLLING_TEXT_COMPLETED = 'SCROLLING_TEXT_COMPLETED'

export const updateLastPlayedVideo = (lastPlayedVideo) => {
  return {
    type: UPDATE_LAST_PLAYED_VIDEO,
    payload: {
      lastPlayedVideo: lastPlayedVideo
    }
  }
}

export const addOverlayTitle = (title) => {
  return {
    type: ADD_OVERLAY_TITLE,
    payload: {
      title: title
    }
  }
}

export const updateScrollingText = (textToScroll) => {
  return {
    type: UPDATE_SCROLLING_TEXT,
    payload: {
      text: textToScroll
    }
  }
}

export const scrollingTextCompleted = () => {
  return {
    type: SCROLLING_TEXT_COMPLETED
  }
}
