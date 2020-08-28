export const FIRST_ALARM_ANNOUNCED = 'FIRST_ALARM_ANNOUNCED';
export const INITIAL_REPORT_COMPLETED = 'INITIAL_REPORT_COMPLETED';
export const THREE_SIXTY_WALKTHROUGH_COMPLETED =
  'THREE_SIXTY_WALKTHROUGH_COMPLETED';
export const THREE_SIXTY_ASSESSMENT_COMPLETED =
  'THREE_SIXTY_ASSESSMENT_COMPLETED';
export const ASSIGNMENTS_COMPLETED = 'ASSIGNMENTS_COMPLETED';
export const INCIDENT_COMPLETED = 'INCIDENT_COMPLETED';
export const INCOMING_COMMAND_OFFICER_ARRIVED =
  'INCOMING_COMMAND_OFFICER_ARRIVED';
export const FACE_TO_FACE_REQUESTED = 'FACE_TO_FACE_REQUESTED';
export const FACE_TO_FACE_COMPLETED = 'FACE_TO_FACE_COMPLETED';
export const INCOMING_COMMAND_OFFICER_RESPONSE =
  'INCOMING_COMMAND_OFFICER_RESPONSE';
export const EDUCATION_COMPLETED = 'EDUCATION_COMPLETED';
export const EVALUATION_COMPLETED = 'EVALUATION_COMPLETED';
export const UPDATE_PARTIAL_TRANSCRIPT = 'UPDATE_PARTIAL_TRANSCRIPT';
export const UPDATE_COMPLETED_TRANSCRIPT = 'UPDATE_COMPLETED_TRANSCRIPT';
export const START_RECORDING_MICROPHONE = 'START_RECORDING_MICROPHONE';
export const STOP_RECORDING_MICROPHONE = 'STOP_RECORDING_MICROPHONE';
export const UPDATE_LAST_PLAYED_VIDEO = 'UPDATE_LAST_PLAYED_VIDEO';
export const UPDATE_SCROLLING_TEXT = 'UPDATE_SCROLLING_TEXT';
export const SCROLLING_TEXT_COMPLETED = 'SCROLLING_TEXT_COMPLETED';
export const ADD_TO_SPEECH_QUEUE = 'ADD_TO_SPEECH_QUEUE';
export const REMOVE_OLDEST_SPEECH_FROM_QUEUE =
  'REMOVE_OLDEST_SPEECH_FROM_QUEUE';
export const START_TIME = 'START_TIME';

export const firstAlarmAnnounced = () => {
  return { type: FIRST_ALARM_ANNOUNCED };
};

export const initialReportCompleted = () => {
  return { type: INITIAL_REPORT_COMPLETED };
};

export const threeSixtyWalkthroughCompleted = () => {
  return { type: THREE_SIXTY_WALKTHROUGH_COMPLETED };
};

export const threeSixtyAssessmentCompleted = () => {
  return { type: THREE_SIXTY_ASSESSMENT_COMPLETED };
};

export const assignmentsCompleted = () => {
  return { type: ASSIGNMENTS_COMPLETED };
};

export const incidentCompleted = () => {
  return { type: INCIDENT_COMPLETED };
};

export const incomingCommandOfficerArrived = () => {
  return { type: INCOMING_COMMAND_OFFICER_ARRIVED };
};

export const faceToFaceRequested = () => {
  return { type: FACE_TO_FACE_REQUESTED };
};

export const faceToFaceCompleted = () => {
  return { type: FACE_TO_FACE_COMPLETED };
};

export const educationCompleted = () => {
  return { type: EDUCATION_COMPLETED };
};

export const evaluationCompleted = () => {
  return { type: EVALUATION_COMPLETED };
};

export const updatePartialTranscript = (text) => {
  return {
    type: UPDATE_PARTIAL_TRANSCRIPT,
    payload: {
      text: text,
    },
  };
};

export const updateCompletedTranscript = (text) => {
  return {
    type: UPDATE_COMPLETED_TRANSCRIPT,
    payload: {
      text: text,
    },
  };
};

export const startRecordingMicrophone = () => {
  return {
    type: START_RECORDING_MICROPHONE,
  };
};

export const stopRecordingMicrophone = () => {
  return {
    type: STOP_RECORDING_MICROPHONE,
  };
};

export const updateLastPlayedVideo = (lastPlayedVideo) => {
  return {
    type: UPDATE_LAST_PLAYED_VIDEO,
    payload: {
      lastPlayedVideo: lastPlayedVideo,
    },
  };
};

export const updateScrollingText = (textToScroll) => {
  return {
    type: UPDATE_SCROLLING_TEXT,
    payload: {
      text: textToScroll,
    },
  };
};

export const scrollingTextCompleted = () => {
  return {
    type: SCROLLING_TEXT_COMPLETED,
  };
};

export const addToSpeechQueue = (item) => {
  return {
    type: ADD_TO_SPEECH_QUEUE,
    payload: {
      label: item.label,
      text: item.text,
      voice: item.voice,
    },
  };
};

export const removeOldestSpeechFromQueue = () => {
  return {
    type: REMOVE_OLDEST_SPEECH_FROM_QUEUE,
  };
};

export const startTime = () => {
  return {
    type: START_TIME,
  };
}