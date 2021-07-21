import * as actionTypes from 'store/actions/units'

const initialState = {
  unitArrivals: [],
  incomingCommandArrival: 0,
  unitAssignments: [],
  unitsAssigned: 0,
  assignmentResponses: 0,
  groupsAssigned: [],
  waitingToBeSpoken: [],
  availableVoices: [],
  textToSpeech: { text: '', voice: '', meta: null },
  radioInUse: false
}

const incidentState = {
  ...initialState,
  unitsAssigned: 3,
  assignmentResponses: 3,
}

const transferOfCommandState = {
  ...incidentState,
  incomingCommandArrival: Date.now()
}

const firstInFirstOut = (array) => {
  let newArray = array.slice()
  newArray.splice(0, 1)
  return newArray
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_UNIT_ARRIVAL:
      return {
        ...state,
        unitArrivals: [
          ...state.unitArrivals,
          { name: action.payload.name, arrival: action.payload.arrival }
        ]
      }
    case actionTypes.ADD_INCOMING_COMMAND_ARRIVAL:
      return {
        ...state,
        incomingCommandArrival: action.payload.arrival
      }
    
    case actionTypes.ADD_UNIT_GROUP_ASSIGNMENTS:
      return {
        ...state,
        unitAssignments: [
          ...state.unitAssignments,
          { name: action.payload.name, group: action.payload.group }
        ]
      }
    case actionTypes.INCREMENT_UNITS_ASSIGNED:
      return {
        ...state,
        unitsAssigned: state.unitsAssigned + 1
      }
    case actionTypes.INCREMENT_ASSIGNMENT_RESPONSES:
      return {
        ...state,
        assignmentResponses: state.assignmentResponses + 1
      }
    case actionTypes.UPDATE_UNITS_ASSIGNED:
      return {
        ...state,
        unitsAssigned: action.payload.units
      }
    case actionTypes.ADD_ASSIGNED_GROUP:
      return {
        ...state,
        groupsAssigned: [...state.groupsAssigned, action.payload.group]
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
    case actionTypes.ADD_TO_FRONT_OF_SPEECH_QUEUE:
      return {
        ...state,
        waitingToBeSpoken: [
          {
            label: action.payload.label,
            text: action.payload.text,
            voice: action.payload.voice,
            meta: action.payload.meta
          },
          ...state.waitingToBeSpoken
        ]
      }
    case actionTypes.CLEAR_SPEECH_QUEUE:
      return {
        ...state,
        waitingToBeSpoken: []
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
    case actionTypes.SPEAK_COMPLETED:
      return {
        ...state,
        waitingToBeSpoken: [...state.waitingToBeSpoken.slice(1)],
        radioInUse: false,
        commandInProgress: false
      }
    case actionTypes.REMOVE_OLDEST_SPEECH_FROM_QUEUE:
      return {
        ...state,
        waitingToBeSpoken: firstInFirstOut(state.waitingToBeSpoken)
      }
    case actionTypes.SET_AVAILABLE_VOICES:
      return {
        ...state,
        availableVoices: action.payload.voices
      }
    case actionTypes.SET_AVAILABLE_VOICES:
      return {
        ...state,
        availableVoices: action.payload.voices
      }
    case actionTypes.USE_RADIO:
      return {
        ...state,
        radioInUse: true
      }
    case actionTypes.SKIP_TO_INCIDENT:
      return incidentState
    case actionTypes.SKIP_TO_TRANSFER_OF_COMMAND:
      return transferOfCommandState
    default:
      return state
  }
}

export default reducer

export { initialState }
