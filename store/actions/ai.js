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
export const FACE_TO_FACE_REQUESTED = 'FACE_TO_FACE_REQUESTED'
export const FACE_TO_FACE_COMPLETED = 'FACE_TO_FACE_COMPLETED'
export const INCOMING_COMMAND_OFFICER_RESPONSE =
  'INCOMING_COMMAND_OFFICER_RESPONSE'
export const EDUCATION_COMPLETED = 'EDUCATION_COMPLETED'
export const EVALUATION_COMPLETED = 'EVALUATION_COMPLETED'
export const SECOND_ALARM_REQUESTED = 'SECOND_ALARM_REQUESTED'
export const THIRD_ALARM_REQUESTED = 'THIRD_ALARM_REQUESTED'
export const SECOND_ALARM_READY = 'SECOND_ALARM_READY'
export const THIRD_ALARM_READY = 'THIRD_ALARM_READY'
export const RESET_AI = 'RESET_AI'

export const firstAlarmAnnounced = () => {
  return { type: FIRST_ALARM_ANNOUNCED }
}

export const initialReportCompleted = () => {
  return { type: INITIAL_REPORT_COMPLETED }
}

export const threeSixtyWalkthroughBegan = () => {
  return { type: THREE_SIXTY_WALKTHROUGH_BEGAN }
}

export const threeSixtyWalkthroughCompleted = () => {
  return { type: THREE_SIXTY_WALKTHROUGH_COMPLETED }
}

export const threeSixtyAssessmentCompleted = () => {
  return { type: THREE_SIXTY_ASSESSMENT_COMPLETED }
}

export const assignmentsCompleted = () => {
  return { type: ASSIGNMENTS_COMPLETED }
}

export const incidentAnnounced = () => {
  return { type: INCIDENT_ANNOUNCED }
}

export const incidentResponded = () => {
  return { type: INCIDENT_RESPONDED }
}

export const incidentCompleted = () => {
  return { type: INCIDENT_COMPLETED }
}

export const incomingCommandArrived = () => {
  return { type: INCOMING_COMMAND_ARRIVED }
}

export const faceToFaceRequested = () => {
  return { type: FACE_TO_FACE_REQUESTED }
}

export const faceToFaceCompleted = () => {
  return { type: FACE_TO_FACE_COMPLETED }
}

export const educationCompleted = () => {
  return { type: EDUCATION_COMPLETED }
}

export const evaluationCompleted = () => {
  return { type: EVALUATION_COMPLETED }
}

export const secondAlarmRequested = () => {
  return { type: SECOND_ALARM_REQUESTED }
}

export const thirdAlarmRequested = () => {
  return { type: THIRD_ALARM_REQUESTED }
}

export const secondAlarmReady = () => {
  return { type: SECOND_ALARM_READY }
}

export const thirdAlarmReady = () => {
  return { type: THIRD_ALARM_READY }
}

export const resetAI = () => {
  return {
    type: RESET_AI
  }
}
