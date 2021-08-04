export const ADD_UNIT_ARRIVAL = 'ADD_UNIT_ARRIVAL'
export const ADD_INCOMING_COMMAND_ARRIVAL = 'ADD_INCOMING_COMMAND_ARRIVAL'
export const ADD_UNIT_GROUP_ASSIGNMENTS = 'ADD_UNIT_GROUP_ASSIGNMENTS'
export const INCREMENT_UNITS_ASSIGNED = 'INCREMENT_UNITS_ASSIGNED'
export const INCREMENT_ASSIGNMENT_RESPONSES = 'INCREMENT_ASSIGNMENT_RESPONSES'
export const UPDATE_UNITS_ASSIGNED = 'UPDATE_UNITS_ASSIGNED'
export const ADD_ASSIGNED_GROUP = 'ADD_ASSIGNED_GROUP'
export const ADD_TO_SPEECH_QUEUE = 'ADD_TO_SPEECH_QUEUE'
export const ADD_TO_FRONT_OF_SPEECH_QUEUE = 'ADD_TO_FRONT_OF_SPEECH_QUEUE'
export const CLEAR_SPEECH_QUEUE = 'CLEAR_SPEECH_QUEUE'
export const UPDATE_TEXT_TO_SPEECH = 'UPDATE_TEXT_TO_SPEECH'
export const SPEAK_COMPLETED = 'SPEAK_COMPLETED'
export const REMOVE_OLDEST_SPEECH_FROM_QUEUE = 'REMOVE_OLDEST_SPEECH_FROM_QUEUE'
export const SET_AVAILABLE_VOICES = 'SET_AVAILABLE_VOICES'
export const USE_RADIO = 'USE_RADIO'
export const SKIP_TO_INCIDENT = 'SKIP_TO_INCIDENT'
export const SKIP_TO_TRANSFER_OF_COMMAND = 'SKIP_TO_TRANSFER_OF_COMMAND'

export const addUnitArrival = (data) => {
  return {
    type: ADD_UNIT_ARRIVAL,
    payload: {
      name: data.name,
      arrival: data.arrival
    }
  }
}

export const addIncomingCommandArrival = (arrival) => {
  return {
    type: ADD_INCOMING_COMMAND_ARRIVAL,
    payload: {
      arrival: arrival
    }
  }
}

export const addUnitGroupAssignment = (data) => {
  return {
    type: ADD_UNIT_GROUP_ASSIGNMENTS,
    payload: {
      name: data.name,
      group: data.group
    }
  }
}

export const incrementUnitsAssigned = () => {
  return {
    type: INCREMENT_UNITS_ASSIGNED
  }
}

export const incrementAssignmentResponses = () => {
  return {
    type: INCREMENT_ASSIGNMENT_RESPONSES
  }
}

export const updateUnitsAssigned = (num) => {
  return {
    type: UPDATE_UNITS_ASSIGNED,
    payload: {
      units: num
    }
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

export const addToFrontOfSpeechQueue = (item) => {
  return {
    type: ADD_TO_FRONT_OF_SPEECH_QUEUE,
    payload: {
      label: item.label,
      text: item.text,
      voice: item.voice,
      meta: item.meta
    }
  }
}

export const clearSpeechQueue = () => {
  return {
    type: CLEAR_SPEECH_QUEUE
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

export const setAvailableVoices = (voices) => {
  return {
    type: SET_AVAILABLE_VOICES,
    payload: {
      voices: voices
    }
  }
}

export const useRadio = () => {
  return {
    type: USE_RADIO
  }
}

export const skipToIncident = () => ({ type: SKIP_TO_INCIDENT })
export const skipToTransferOfCommand = () => ({
  type: SKIP_TO_TRANSFER_OF_COMMAND
})
