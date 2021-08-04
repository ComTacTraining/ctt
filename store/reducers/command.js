import * as actionTypes from '@/store/actions/command'

const initialState = {
  incidentCommandName: 'Command',
  commandAllowed: false,
  isPartialCommand: false,
  partialCommand: '',
  command: '',
  isRecordingMicrophone: false,
  commandInProgress: false,
  isListeningMicrophone: false,
  speechBotState: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COMMAND_NAME:
      return {
        ...state,
        incidentCommandName: action.payload.name
      }
    case actionTypes.SET_COMMAND_ALLOWED:
      return {
        ...state,
        commandAllowed: action.payload.isAllowed
      }
    case actionTypes.UPDATE_PARTIAL_TRANSCRIPT:
      return {
        ...state,
        isPartialCommand: true,
        partialCommand: action.payload.text
      }
    case actionTypes.UPDATE_COMPLETED_TRANSCRIPT:
      return {
        ...state,
        isPartialCommand: false,
        partialCommand: '',
        command: action.payload.text,
        radioInUse: false
      }
    case actionTypes.CLEAR_COMMAND:
      return {
        ...state,
        command: ''
      }
    case actionTypes.START_RECORDING_MICROPHONE:
      return {
        ...state,
        isRecordingMicrophone: true,
        commandInProgress: true
      }
    case actionTypes.STOP_RECORDING_MICROPHONE:
      return {
        ...state,
        isRecordingMicrophone: false,
        commandInProgress: false
      }
    case actionTypes.START_LISTENING_MICROPHONE:
      return {
        ...state,
        isListeningMicrophone: true
      }
    case actionTypes.STOP_LISTENING_MICROPHONE:
      return {
        ...state,
        isListeningMicrophone: false
      }
    case actionTypes.COMMAND_IN_PROGRESS:
      return {
        ...state,
        commandInProgress: true
      }
    case actionTypes.UPDATE_SPEECH_BOT_STATE:
      return {
        ...state,
        speechBotState: action.payload.text
      }
    default:
      return state
  }
}

export default reducer

export { initialState }
