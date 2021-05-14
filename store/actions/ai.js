export const FIRST_ALARM_ANNOUNCED = 'FIRST_ALARM_ANNOUNCED'
export const INITIAL_REPORT_COMPLETED = 'INITIAL_REPORT_COMPLETED'
export const THREE_SIXTY_WALKTHROUGH_BEGAN = 'THREE_SIXTY_WALKTHROUGH_BEGAN'
export const THREE_SIXTY_WALKTHROUGH_COMPLETED =
  'THREE_SIXTY_WALKTHROUGH_COMPLETED'
export const THREE_SIXTY_ASSESSMENT_COMPLETED =
  'THREE_SIXTY_ASSESSMENT_COMPLETED'
export const ASSIGNMENTS_COMPLETED = 'ASSIGNMENTS_COMPLETED'
export const INCIDENT_ANNOUNCED = 'INCIDENT_ANNOUNCED'
export const INCIDENT_COMPLETED = 'INCIDENT_COMPLETED'
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
export const UPDATE_PARTIAL_TRANSCRIPT = 'UPDATE_PARTIAL_TRANSCRIPT'
export const UPDATE_COMPLETED_TRANSCRIPT = 'UPDATE_COMPLETED_TRANSCRIPT'
export const CLEAR_COMMAND = 'CLEAR_COMMAND'
export const START_RECORDING_MICROPHONE = 'START_RECORDING_MICROPHONE'
export const STOP_RECORDING_MICROPHONE = 'STOP_RECORDING_MICROPHONE'
export const START_LISTENING_MICROPHONE = 'START_LISTENING_MICROPHONE'
export const STOP_LISTENING_MICROPHONE = 'STOP_LISTENING_MICROPHONE'
export const INCREMENT_UNITS_ASSIGNED = 'INCREMENT_UNITS_ASSIGNED'
export const ADD_ASSIGNED_GROUP = 'ADD_ASSIGNED_GROUP'
export const UPDATE_LAST_PLAYED_VIDEO = 'UPDATE_LAST_PLAYED_VIDEO'
export const UPDATE_SCROLLING_TEXT = 'UPDATE_SCROLLING_TEXT'
export const SCROLLING_TEXT_COMPLETED = 'SCROLLING_TEXT_COMPLETED'
export const ADD_TO_SPEECH_QUEUE = 'ADD_TO_SPEECH_QUEUE'
export const UPDATE_TEXT_TO_SPEECH = 'UPDATE_TEXT_TO_SPEECH'
export const USE_RADIO = 'USE_RADIO'
export const SPEAK_COMPLETED = 'SPEAK_COMPLETED'
export const REMOVE_OLDEST_SPEECH_FROM_QUEUE = 'REMOVE_OLDEST_SPEECH_FROM_QUEUE'
export const ADD_TO_LOG = 'ADD_TO_LOG'
export const SET_COMMAND_NAME = 'SET_COMMAND_NAME'
export const START_TIME = 'START_TIME'
export const SET_AVAILABLE_VOICES = 'SET_AVAILABLE_VOICES'
export const UPDATE_SPEECH_BOT_STATE = 'UPDATE_SPEECH_BOT_STATE'
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

export const incidentCompleted = () => {
  return { type: INCIDENT_COMPLETED }
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

export const updatePartialTranscript = (text) => {
  return {
    type: UPDATE_PARTIAL_TRANSCRIPT,
    payload: {
      text: text
    }
  }
}

export const updateSpeechBotState = (text) => {
  return {
    type: UPDATE_SPEECH_BOT_STATE,
    payload: {
      text: text
    }
  }
}

export const updateCompletedTranscript = (text) => {
  return {
    type: UPDATE_COMPLETED_TRANSCRIPT,
    payload: {
      text: text
    }
  }
}

export const clearCommand = () => {
  return { type: CLEAR_COMMAND }
}

export const startRecordingMicrophone = () => {
  return {
    type: START_RECORDING_MICROPHONE
  }
}

export const stopRecordingMicrophone = () => {
  return {
    type: STOP_RECORDING_MICROPHONE
  }
}

export const startListeningMicrophone = () => {
  return {
    type: START_LISTENING_MICROPHONE
  }
}

export const stopListeningMicrophone = () => {
  return {
    type: STOP_LISTENING_MICROPHONE
  }
}
export const incrementUnitsAssigned = () => {
  return {
    type: INCREMENT_UNITS_ASSIGNED
  }
}

export const addAssignedGroup = (group) => {
  return {
    type: ADD_ASSIGNED_GROUP,
    payload: {
      group: group
    }
  }
}

export const updateLastPlayedVideo = (lastPlayedVideo) => {
  return {
    type: UPDATE_LAST_PLAYED_VIDEO,
    payload: {
      lastPlayedVideo: lastPlayedVideo
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

export const addToSpeechQueue = (item) => {
  return {
    type: ADD_TO_SPEECH_QUEUE,
    payload: {
      label: item.label,
      text: item.text,
      voice: item.voice,
      meta: item.meta
    }
  }
}

export const updateTextToSpeech = (item) => {
  return {
    type: UPDATE_TEXT_TO_SPEECH,
    payload: {
      text: item.text,
      voice: item.voice,
      meta: item.meta
    }
  }
}

export const useRadio = () => {
  return {
    type: USE_RADIO
  }
}

export const speakCompleted = () => {
  return {
    type: SPEAK_COMPLETED
  }
}

export const removeOldestSpeechFromQueue = () => {
  return {
    type: REMOVE_OLDEST_SPEECH_FROM_QUEUE
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

export const setCommandName = (name) => {
  return {
    type: SET_COMMAND_NAME,
    payload: {
      name: name
    }
  }
}

export const startTime = () => {
  return {
    type: START_TIME
  }
}

export const setAvailableVoices = (voices) => {
  return {
    type: SET_AVAILABLE_VOICES,
    payload: {
      voices: voices
    }
  }
}

export const resetAI = () => {
  return {
    type: RESET_AI
  }
}
