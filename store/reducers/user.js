import * as actionTypes from '@/store/actions/user'

const initialState = {
  dispatchCenter: 'Dispatch',
  firstOnScene: 'Engine 1',
  incomingCommandOfficer: 'Battalion 1',
  alarm1: [
    'Engine 1',
    'Engine 2',
    'Engine 3',
    'Truck 1',
    'Truck 2',
    'Battalion 1'
  ],
  alarm2: [
    'Engine 21',
    'Engine 22',
    'Engine 23',
    'Truck 21',
    'Truck 22',
    'Battalion 2'
  ],
  alarm3: [
    'Engine 31',
    'Engine 32',
    'Engine 33',
    'Truck 31',
    'Truck 32',
    'Battalion 3'
  ],
  showTips: true,
  preferencesLoaded: false,
  commandInputMethod: 'Microphone',
  masterVolume: 0.5,
  permissionGranted: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_TIPS:
      return {
        ...state,
        showTips: !state.showTips
      }
    case actionTypes.UPDATE_USER_PREFERENCES:
      return {
        ...state,
        dispatchCenter: action.payload.dispatchCenter,
        firstOnScene: action.payload.firstOnScene,
        incomingCommandOfficer: action.payload.incomingCommandOfficer,
        alarm1: action.payload.alarm1,
        alarm2: action.payload.alarm2,
        alarm3: action.payload.alarm3,
        showTips: action.payload.showTips,
        preferencesLoaded: true
      }
    case actionTypes.SET_COMMAND_INPUT_METHOD:
      return {
        ...state,
        commandInputMethod: action.payload.input
      }
    case actionTypes.UPDATE_MASTER_VOLUME:
      return {
        ...state,
        masterVolume: action.payload.level
      }
    case actionTypes.SET_PERMISSION_GRANTED:
      return {
        ...state,
        permissionGranted: true
      }
    default:
      return state
  }
}

export default reducer

export { initialState }
