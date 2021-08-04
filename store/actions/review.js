export const START_TIME = 'START_TIME'
export const ADD_TO_LOG = 'ADD_TO_LOG'

export const startTime = () => {
  return {
    type: START_TIME
  }
}
export const addToLog = (item) => {
  return {
    type: ADD_TO_LOG,
    payload: {
      timestamp: item.timestamp,
      label: item.label,
      text: item.text
    }
  }
}
