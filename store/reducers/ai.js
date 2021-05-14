import * as actionTypes from '../actions/ai'

const initialState = {
  firstAlarmAnnounced: false,
  initialReportCompleted: false,
  threeSixtyWalkthroughBegan: false,
  threeSixtyWalkthroughCompleted: false,
  threeSixtyAssessmentCompleted: false,
  assignmentsCompleted: false,
  incidentAnnounced: false,
  incidentCompleted: false,
  faceToFaceRequested: false,
  faceToFaceCompleted: false,
  educationCompleted: false,
  evaluationCompleted: false,
  secondAlarmRequested: false,
  thirdAlarmRequested: false,
  secondAlarmReady: false,
  thirdAlarmReady: false,
  isPartialCommand: false,
  partialCommand: '',
  command: '',
  speechBotState: '',
  isRecordingMicrophone: false,
  isListeningMicrophone: false,
  unitsAssigned: 0,
  groupsAssigned: [],
  scrollText: [],
  isScrollingText: false,
  waitingToBeSpoken: [],
  log: [],
  incidentCommandName: 'Command',
  lastPlayedVideo: '',
  start: 0,
  availableVoices: [],
  radioInUse: false,
  textToSpeech: { text: '', voice: '', meta: null }
}

const firstInFirstOut = (array) => {
  let newArray = array.slice()
  newArray.splice(0, 1)
  return newArray
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FIRST_ALARM_ANNOUNCED:
      return {
        ...state,
        firstAlarmAnnounced: true
      }
    case actionTypes.INITIAL_REPORT_COMPLETED:
      return {
        ...state,
        initialReportCompleted: true
      }
    case actionTypes.THREE_SIXTY_WALKTHROUGH_BEGAN:
      return {
        ...state,
        threeSixtyWalkthroughBegan: true
      }
    case actionTypes.THREE_SIXTY_WALKTHROUGH_COMPLETED:
      return {
        ...state,
        threeSixtyWalkthroughCompleted: true
      }
    case actionTypes.THREE_SIXTY_ASSESSMENT_COMPLETED:
      return {
        ...state,
        threeSixtyAssessmentCompleted: true
      }
    case actionTypes.ASSIGNMENTS_COMPLETED:
      return {
        ...state,
        assignmentsCompleted: true
      }
    case actionTypes.INCIDENT_ANNOUNCED:
      return {
        ...state,
        incidentAnnounced: true
      }
    case actionTypes.INCIDENT_COMPLETED:
      return {
        ...state,
        incidentCompleted: true
      }
    case actionTypes.FACE_TO_FACE_REQUESTED:
      return {
        ...state,
        faceToFaceRequested: true,
        isRecordingMicrophone: true
      }
    case actionTypes.FACE_TO_FACE_COMPLETED:
      return {
        ...state,
        faceToFaceCompleted: true,
        isRecordingMicrophone: false
      }
    case actionTypes.EDUCATION_COMPLETED:
      return {
        ...state,
        educationCompleted: true
      }
    case actionTypes.EVALUATION_COMPLETED:
      return {
        ...state,
        evaluationCompleted: true
      }
    case actionTypes.SECOND_ALARM_REQUESTED:
      return {
        ...state,
        secondAlarmRequested: true
      }
    case actionTypes.THIRD_ALARM_REQUESTED:
      return {
        ...state,
        thirdAlarmRequested: true
      }
    case actionTypes.SECOND_ALARM_READY:
      return {
        ...state,
        secondAlarmReady: true
      }
    case actionTypes.THIRD_ALARM_READY:
      return {
        ...state,
        thirdAlarmReady: true
      }
    case actionTypes.UPDATE_PARTIAL_TRANSCRIPT:
      return {
        ...state,
        isPartialCommand: true,
        partialCommand: action.payload.text
      }
    case actionTypes.UPDATE_SPEECH_BOT_STATE:
      return {
        ...state,
        speechBotState: action.payload.text
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
        isRecordingMicrophone: true
      }
    case actionTypes.STOP_RECORDING_MICROPHONE:
      return {
        ...state,
        isRecordingMicrophone: false
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
    case actionTypes.INCREMENT_UNITS_ASSIGNED:
      return {
        ...state,
        unitsAssigned: state.unitsAssigned + 1
      }
    case actionTypes.ADD_ASSIGNED_GROUP:
      return {
        ...state,
        groupsAssigned: [...state.groupsAssigned, action.payload.group]
      }
    case actionTypes.UPDATE_LAST_PLAYED_VIDEO:
      return {
        ...state,
        lastPlayedVideo: action.payload.lastPlayedVideo
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
        firstAlarmAnnounced: true
      }
    case actionTypes.ADD_TO_SPEECH_QUEUE:
      return {
        ...state,
        waitingToBeSpoken: [
          ...state.waitingToBeSpoken,
          {
            label: action.payload.label,
            text: action.payload.text,
            voice: action.payload.voice,
            meta: action.payload.meta
          }
        ]
      }
    case actionTypes.UPDATE_TEXT_TO_SPEECH:
      return {
        ...state,
        textToSpeech: {
          text: action.payload.text,
          voice: action.payload.voice,
          meta: action.payload.meta
        }
      }
    case actionTypes.USE_RADIO:
      return {
        ...state,
        radioInUse: true
      }
    case actionTypes.SPEAK_COMPLETED:
      return {
        ...state,
        waitingToBeSpoken: [...state.waitingToBeSpoken.slice(1)],
        radioInUse: false
      }
    case actionTypes.REMOVE_OLDEST_SPEECH_FROM_QUEUE:
      return {
        ...state,
        waitingToBeSpoken: firstInFirstOut(state.waitingToBeSpoken)
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
    case actionTypes.SET_COMMAND_NAME:
      return {
        ...state,
        incidentCommandName: action.payload.name
      }
    case actionTypes.START_TIME:
      return {
        ...state,
        start: Date.now()
      }
    case actionTypes.SET_AVAILABLE_VOICES:
      return {
        ...state,
        availableVoices: action.payload.voices
      }
    case actionTypes.RESET_AI:
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default reducer

export { initialState }
