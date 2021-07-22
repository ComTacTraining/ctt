import * as actionTypes from 'store/actions/ai'

const initialState = {
  firstAlarmAnnounced: false,
  initialReportCompleted: false,
  threeSixtyWalkthroughBegan: false,
  threeSixtyWalkthroughCompleted: false,
  threeSixtyAssessmentCompleted: false,
  assignmentsCompleted: false,
  incidentAnnounced: false,
  incidentResponded: false,
  incidentCompleted: false,
  incomingCommandArrived: false,
  transferOfCommandRequested: false,
  transferOfCommandCompleted: false,
  educationCompleted: false,
  evaluationCompleted: false,
  secondAlarmRequested: false,
  thirdAlarmRequested: false,
  secondAlarmReady: false,
  thirdAlarmReady: false
}

const initialReportState = {
  ...initialState,
  firstAlarmAnnounced: true
}

const threeSixtyAssessmentState = {
  ...initialReportState,
  initialReportCompleted: true,
  threeSixtyWalkthroughBegan: true,
  threeSixtyWalkthroughCompleted: true
}

const assignmentsState = {
  ...threeSixtyAssessmentState,
  threeSixtyAssessmentCompleted: true,
}

const incidentState = {
  ...assignmentsState,
  assignmentsCompleted: true
}

const transferOfCommandState = {
  ...assignmentsState,
  incidentAnnounced: false,
  incidentResponded: false,
  incidentCompleted: true
}

const educationState = {
  ...transferOfCommandState,
  transferOfCommandRequested: true,
  transferOfCommandCompleted: true
}

const evaluationState = {
  ...educationState,
  educationCompleted: true
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
    case actionTypes.INCIDENT_RESPONDED:
      return {
        ...state,
        incidentResponded: true
      }
    case actionTypes.INCIDENT_COMPLETED:
      return {
        ...state,
        incidentCompleted: true
      }
    case actionTypes.INCOMING_COMMAND_ARRIVED:
      return {
        ...state,
        incomingCommandArrived: true
      }
    case actionTypes.TRANSFER_OF_COMMAND_REQUESTED:
      return {
        ...state,
        transferOfCommandRequested: true,
      }
    case actionTypes.TRANSFER_OF_COMMAND_COMPLETED:
      return {
        ...state,
        transferOfCommandCompleted: true,
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
    case actionTypes.SKIP_TO_INITIAL_REPORT:
      return initialReportState
    case actionTypes.SKIP_TO_360_ASSESSMENT:
      return threeSixtyAssessmentState
    case actionTypes.SKIP_TO_ASSIGNMENTS:
      return assignmentsState
    case actionTypes.SKIP_TO_INCIDENT:
      return incidentState
    case actionTypes.SKIP_TO_TRANSFER_OF_COMMAND:
      return transferOfCommandState
    case actionTypes.SKIP_TO_EDUCATION:
      return educationState
    case actionTypes.SKIP_TO_EVALUATION:
      return evaluationState
    case actionTypes.RESET_AI:
      return initialState
    default:
      return state
  }
}

export default reducer

export { initialState }
