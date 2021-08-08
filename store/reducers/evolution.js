import * as actionTypes from '@/store/actions/evolution'

const initialState = {
  id: '',
  alias: '',
  isDemo: true,
  category: 'SINGLEFAMILYMODERN',
  construction: ['MODERN'],
  street: '623 Luna Park',
  size: 'MEDIUM',
  stories: 1,
  occupancy: 'Single Family Dwelling',
  conditions: 'CHARLIE',
  entryEgress: ['ALPHA', 'BRAVO', 'CHARLIE'],
  survivability: 'MARGINAL',
  placement: 'CHARLIE',
  side: 'CHARLIE',
  flow: 'BIDIRECTIONAL',
  fire: 'ROOMCONTENTS',
  exhaust: 'CHARLIE',
  smoke: 'BLACKLAMINAR',
  withstanding: false,
  attack: true,
  ventilation: true,
  exposure: true,
  ric: true,
  medical: true,
  incidentTitle: 'Ladder Slip Injuries',
  incidentGroup: 'VENTILATION',
  incidentCommand:
    'Command from __NAME__ firefighter has been injured on a ground ladder that has slipped, he rode the ladder to the ground and hit his head. He is unconscious.'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_EVOLUTION:
      return {
        ...state,
        id: action.payload.id,
        alias: action.payload.alias,
        isDemo: false,
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
        exposure: action.payload.exposure,
        ric: action.payload.ric,
        medical: action.payload.medical
      }
    case actionTypes.UPDATE_INCIDENT:
      return {
        ...state,
        incidentTitle: action.payload.incidentTitle,
        incidentGroup: action.payload.incidentGroup,
        incidentCommand: action.payload.incidentCommand
      }
    default:
      return state
  }
}

export default reducer

export { initialState }
