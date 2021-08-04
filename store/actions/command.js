export const SET_COMMAND_NAME = 'SET_COMMAND_NAME'
export const SET_COMMAND_ALLOWED = 'SET_COMMAND_ALLOWED'
export const UPDATE_PARTIAL_TRANSCRIPT = 'UPDATE_PARTIAL_TRANSCRIPT'
export const UPDATE_COMPLETED_TRANSCRIPT = 'UPDATE_COMPLETED_TRANSCRIPT'
export const COMMAND_IN_PROGRESS = 'COMMAND_IN_PROGRESS'
export const CLEAR_COMMAND = 'CLEAR_COMMAND'
export const START_RECORDING_MICROPHONE = 'START_RECORDING_MICROPHONE'
export const STOP_RECORDING_MICROPHONE = 'STOP_RECORDING_MICROPHONE'
export const START_LISTENING_MICROPHONE = 'START_LISTENING_MICROPHONE'
export const STOP_LISTENING_MICROPHONE = 'STOP_LISTENING_MICROPHONE'
export const UPDATE_SPEECH_BOT_STATE = 'UPDATE_SPEECH_BOT_STATE'

export const setCommandName = (name) => {
  return {
    type: SET_COMMAND_NAME,
    payload: {
      name: name
    }
  }
}

export const setCommandAllowed = (isAllowed) => {
  return {
    type: SET_COMMAND_ALLOWED,
    payload: {
      isAllowed: isAllowed
    }
  }
}

export const updatePartialTranscript = (text) => {
  return {
    type: UPDATE_PARTIAL_TRANSCRIPT,
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

export const commandInProgress = () => {
  return {
    type: COMMAND_IN_PROGRESS
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

export const updateSpeechBotState = (text) => {
  return {
    type: UPDATE_SPEECH_BOT_STATE,
    payload: {
      text: text
    }
  }
}
