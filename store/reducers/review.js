import * as actionTypes from 'store/actions/review'

const initialState = {
  start: 0,
  log: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_TIME:
      return {
        ...state,
        start: Date.now()
      }
    case actionTypes.ADD_TO_LOG:
      return {
        ...state,
        log: [
          ...state.log,
          {
            timestamp: action.payload.timestamp,
            label: action.payload.label,
            text: action.payload.text
          }
        ]
      }
    default:
      return state
  }
}

export default reducer

export { initialState }
