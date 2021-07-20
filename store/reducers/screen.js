import * as actionTypes from 'store/actions/screen'

const initialState = {
  lastPlayedVideo: '',
  overlayTitle: '',
  scrollText: [],
  isScrollingText: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_LAST_PLAYED_VIDEO:
      return {
        ...state,
        lastPlayedVideo: action.payload.lastPlayedVideo
      }
    case actionTypes.ADD_OVERLAY_TITLE:
      return {
        ...state,
        overlayTitle: action.payload.title
      }
    case actionTypes.UPDATE_SCROLLING_TEXT:
      return {
        ...state,
        scrollText: action.payload.text,
        isScrollingText: true
      }
    case actionTypes.SCROLLING_TEXT_COMPLETED:
      return {
        ...state,
        scrollText: [],
        isScrollingText: false,
        // firstAlarmAnnounced: true
      }
    default:
      return state
  }
}

export default reducer

export { initialState }
