import * as actionTypes from '../actions/evolution';

const initialState = {
  id: '',
  category: '',
  construction: [],
  street: '',
  size: '',
  stories: 0,
  occupancy: '',
  conditions: '',
  entryEgress: [],
  survivability: '',
  placement: '',
  side: '',
  flow: '',
  fire: '',
  exhaust: '',
  smoke: '',
  withstanding: false,
  attack: false,
  ventilation: false,
  exposure: false,
  ric: false,
  medical: false,
  incidentTitle: '',
  incidentGroup: '',
  incidentCommand: ''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_EVOLUTION:
      return {
        ...state,
        id: action.payload.id,
        category: action.payload.category,
        construction: action.payload.construction,
        street: action.payload.street,
        size: action.payload.size,
        stories: action.payload.stories,
        occupancy: action.payload.occupancy,
        conditions: action.payload.conditions,
        entryEgress: action.payload.entryEgress,
        survivability: action.payload.survivability,
        placement: action.payload.placement,
        side: action.payload.side,
        flow: action.payload.flow,
        fire: action.payload.fire,
        exhaust: action.payload.exhaust,
        smoke: action.payload.smoke,
        withstanding: action.payload.withstanding,
        attack: action.payload.attack,
        ventilation: action.payload.ventilation,
        exposure: action.payload.eexposure,
        ric: action.payload.ric,
        medical: action.payload.medical,
      };
    case actionTypes.UPDATE_INCIDENT:
      return {
        ...state,
        incidentTitle: action.payload.incidentTitle,
        incidentGroup: action.payload.incidentGroup,
        incidentCommand: action.payload.incidentCommand
      }
    default:
      return state;
  }
};

export default reducer;

export { initialState };
