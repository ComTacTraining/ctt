export const FIRST_ALARM_ANNOUNCED = 'FIRST_ALARM_ANNOUNCED'
export const INITIAL_REPORT_COMPLETED = 'INITIAL_REPORT_COMPLETED'
export const THREE_SIXTY_WALKTHROUGH_BEGAN = 'THREE_SIXTY_WALKTHROUGH_BEGAN'
export const THREE_SIXTY_WALKTHROUGH_COMPLETED =
  'THREE_SIXTY_WALKTHROUGH_COMPLETED'
export const THREE_SIXTY_ASSESSMENT_COMPLETED =
  'THREE_SIXTY_ASSESSMENT_COMPLETED'
export const ASSIGNMENTS_COMPLETED = 'ASSIGNMENTS_COMPLETED'
export const INCIDENT_ANNOUNCED = 'INCIDENT_ANNOUNCED'
export const INCIDENT_RESPONDED = 'INCIDENT_RESPONDED'
export const INCIDENT_COMPLETED = 'INCIDENT_COMPLETED'
export const INCOMING_COMMAND_ARRIVED = 'INCOMING_COMMAND_ARRIVED'
export const TRANSFER_OF_COMMAND_REQUESTED = 'TRANSFER_OF_COMMAND_REQUESTED'
export const TRANSFER_OF_COMMAND_COMPLETED = 'TRANSFER_OF_COMMAND_COMPLETED'
export const INCOMING_COMMAND_OFFICER_RESPONSE =
  'INCOMING_COMMAND_OFFICER_RESPONSE'
export const EDUCATION_COMPLETED = 'EDUCATION_COMPLETED'
export const EVALUATION_COMPLETED = 'EVALUATION_COMPLETED'
export const SECOND_ALARM_REQUESTED = 'SECOND_ALARM_REQUESTED'
export const THIRD_ALARM_REQUESTED = 'THIRD_ALARM_REQUESTED'
export const SECOND_ALARM_READY = 'SECOND_ALARM_READY'
export const THIRD_ALARM_READY = 'THIRD_ALARM_READY'
export const SKIP_TO_INITIAL_REPORT = 'SKIP_TO_INITIAL_REPORT'
export const SKIP_TO_360_ASSESSMENT = 'SKIP_TO_360_ASSESSMENT'
export const SKIP_TO_ASSIGNMENTS = 'SKIP_TO_ASSIGNMENTS'
export const SKIP_TO_INCIDENT = 'SKIP_TO_INCIDENT'
export const SKIP_TO_TRANSFER_OF_COMMAND = 'SKIP_TO_TRANSFER_OF_COMMAND'
export const SKIP_TO_EDUCATION = 'SKIP_TO_EDUCATION'
export const SKIP_TO_EVALUATION = 'SKIP_TO_EVALUATION'
export const RESET_AI = 'RESET_AI'

export const firstAlarmAnnounced = () => ({ type: FIRST_ALARM_ANNOUNCED })
export const initialReportCompleted = () => ({ type: INITIAL_REPORT_COMPLETED })
export const threeSixtyWalkthroughBegan = () => ({
  type: THREE_SIXTY_WALKTHROUGH_BEGAN
})
export const threeSixtyWalkthroughCompleted = () => ({
  type: THREE_SIXTY_WALKTHROUGH_COMPLETED
})
export const threeSixtyAssessmentCompleted = () => ({
  type: THREE_SIXTY_ASSESSMENT_COMPLETED
})
export const assignmentsCompleted = () => ({ type: ASSIGNMENTS_COMPLETED })
export const incidentAnnounced = () => ({ type: INCIDENT_ANNOUNCED })
export const incidentResponded = () => ({ type: INCIDENT_RESPONDED })
export const incidentCompleted = () => ({ type: INCIDENT_COMPLETED })
export const incomingCommandArrived = () => ({ type: INCOMING_COMMAND_ARRIVED })
export const transferOfCommandRequested = () => ({
  type: TRANSFER_OF_COMMAND_REQUESTED
})
export const transferOfCommandCompleted = () => ({
  type: TRANSFER_OF_COMMAND_COMPLETED
})
export const educationCompleted = () => ({ type: EDUCATION_COMPLETED })
export const evaluationCompleted = () => ({ type: EVALUATION_COMPLETED })
export const secondAlarmRequested = () => ({ type: SECOND_ALARM_REQUESTED })
export const thirdAlarmRequested = () => ({ type: THIRD_ALARM_REQUESTED })
export const secondAlarmReady = () => ({ type: SECOND_ALARM_READY })
export const thirdAlarmReady = () => ({ type: THIRD_ALARM_READY })
export const skipToInitialReport = () => ({ type: SKIP_TO_INITIAL_REPORT })
export const skipTo360Assessment = () => ({ type: SKIP_TO_360_ASSESSMENT })
export const skipToAssignments = () => ({ type: SKIP_TO_ASSIGNMENTS })
export const skipToIncident = () => ({ type: SKIP_TO_INCIDENT })
export const skipToTransferOfCommand = () => ({
  type: SKIP_TO_TRANSFER_OF_COMMAND
})
export const skipToEducation = () => ({ type: SKIP_TO_EDUCATION })
export const skipToEvaluation = () => ({ type: SKIP_TO_EVALUATION })
export const resetAI = () => ({ type: RESET_AI })
