import * as actionTypes from '../actions/ai';

const initialState = {
  firstAlarmAnnounced: false,
  initialReportCompleted: false,
  threeSixtyWalkthroughCompleted: false,
  threeSixtyAssessmentCompleted: false,
  assignmentsCompleted: false,
  incidentCompleted: false,
  incomingCommandOfficerArrived: false,
  faceToFaceRequested: false,
  faceToFaceCompleted: false,
  educationCompleted: false,
  evaluationCompleted: false,
  isPartialCommand: false,
  partialCommand: '',
  command: '',
  isRecordingMicrophone: false,
  scrollText: [],
  isScrollingText: false,
  waitingToBeSpoken: [],
  incidentCommandName: '',
  lastPlayedVideo: '',
};

const removeFirstItem = (array) => {
  let newArray = array.slice();
  newArray.splice(0, 1);
  return newArray;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FIRST_ALARM_ANNOUNCED:
      return {
        ...state,
        firstAlarmAnnounced: true,
      };
    case actionTypes.INITIAL_REPORT_COMPLETED:
      return {
        ...state,
        initialReportCompleted: true,
      };
    case actionTypes.THREE_SIXTY_WALKTHROUGH_COMPLETED:
      return {
        ...state,
        threeSixtyWalkthroughCompleted: true,
      };
    case actionTypes.THREE_SIXTY_ASSESSMENT_COMPLETED:
      return {
        ...state,
        threeSixtyAssessmentCompleted: true,
      };
    case actionTypes.ASSIGNMENTS_COMPLETED:
      return {
        ...state,
        assignmentsCompleted: true,
      };
    case actionTypes.INCIDENT_COMPLETED:
      return {
        ...state,
        incidentCompleted: true,
      };
    case actionTypes.INCOMING_COMMAND_OFFICER_ARRIVED:
      return {
        ...state,
        incomingCommandOfficerArrived: true,
      };
    case actionTypes.FACE_TO_FACE_REQUESTED:
      return {
        ...state,
        faceToFaceRequested: true,
        isRecordingMicrophone: true,
      };
    case actionTypes.FACE_TO_FACE_COMPLETED:
      return {
        ...state,
        faceToFaceCompleted: true,
        isRecordingMicrophone: false,
      };
    case actionTypes.EDUCATION_COMPLETED:
      return {
        ...state,
        educationCompleted: true,
      };
    case actionTypes.EVALUATION_COMPLETED:
      return {
        ...state,
        evaluationCompleted: true,
      };
    case actionTypes.UPDATE_PARTIAL_TRANSCRIPT:
      return {
        ...state,
        isPartialCommand: true,
        partialCommand: action.payload.text,
      };
    case actionTypes.UPDATE_COMPLETED_TRANSCRIPT:
      return {
        ...state,
        isPartialCommand: false,
        partialCommand: '',
        command: action.payload.text,
      };
    case actionTypes.START_RECORDING_MICROPHONE:
      return {
        ...state,
        isRecordingMicrophone: true,
      };
    case actionTypes.STOP_RECORDING_MICROPHONE:
      return {
        ...state,
        isRecordingMicrophone: false,
      };
    case actionTypes.UPDATE_LAST_PLAYED_VIDEO:
      return {
        ...state,
        lastPlayedVideo: action.payload.lastPlayedVideo
      };
    case actionTypes.UPDATE_SCROLLING_TEXT:
      return {
        ...state,
        scrollText: action.payload.text,
        isScrollingText: true,
      };
    case actionTypes.SCROLLING_TEXT_COMPLETED:
      return {
        ...state,
        scrollText: [],
        isScrollingText: false,
        firstAlarmAnnounced: true,
      };
    case actionTypes.ADD_TO_SPEECH_QUEUE:
      return {
        ...state,
        waitingToBeSpoken: [
          ...state.waitingToBeSpoken,
          {
            label: action.payload.label,
            text: action.payload.text,
            voice: action.payload.voice,
          },
        ],
      };
    case actionTypes.REMOVE_OLDEST_SPEECH_FROM_QUEUE:
      return {
        ...state,
        waitingToBeSpoken: removeFirstItem(state.waitingToBeSpoken),
      };
    default:
      return state;
  }
};

export default reducer;

export { initialState };
