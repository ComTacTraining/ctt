import * as actionTypes from "../actions/evaluation";

const initialState = {
  size: false,
  height: false,
  occupancy: false,
  witnessed: false,
  actions: false,
  needs: false,
  designation: false,
  construction: false,
  entryEgress: false,
  conditions: false,
  interiorPath: false,
  survivability: false,
  priorities: false,
  tacticalSizeup: false,
  tacticalLocate: false,
  tacticalIdentify: false,
  tacticalCool: false,
  tacticalExtinguish: false,
  tacticalRescue: false,
  tacticalSalvage: false,
  strategicRescue: false,
  strategicExposures: false,
  strategicConfinement: false,
  strategicExtinguishment: false,
  strategicOverhaul: false,
  strategicVentilation: false,
  strategicSalvage: false,
  incident: false,
  par: false,
  can: false,
  transferAssignments: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADDRESSED_SIZE:
      return { ...state, size: true };
    case actionTypes.ADDRESSED_HEIGHT:
      return { ...state, height: true };
    case actionTypes.ADDRESSED_OCCUPANCY:
      return { ...state, occupancy: true };
    case actionTypes.ADDRESSED_WITNESSED:
      return { ...state, witnessed: true };
    case actionTypes.ADDRESSED_ACTIONS:
      return { ...state, actions: true };
    case actionTypes.ADDRESSED_NEEDS:
      return { ...state, needs: true };
    case actionTypes.ADDRESSED_DESIGNATION:
      return { ...state, designation: true };
    case actionTypes.ADDRESSED_CONSTRUCTION:
      return { ...state, construction: true };
    case actionTypes.ADDRESSED_ENTRY_EGRESS:
      return { ...state, entryEgress: true };
    case actionTypes.ADDRESSED_CONDITIONS:
      return { ...state, conditions: true };
    case actionTypes.ADDRESSED_INTERIOR_PATH:
      return { ...state, interiorPath: true };
    case actionTypes.ADDRESSED_SURVIVABILITY:
      return { ...state, survivability: true };
    case actionTypes.ADDRESSED_PRIORITES:
      return { ...state, priorities: true };
    case actionTypes.ADDRESSED_TACTICAL_SIZEUP:
      return { ...state, tacticalSizeup: true };
    case actionTypes.ADDRESSED_TACTICAL_LOCATE:
      return { ...state, tacticalLocate: true };
    case actionTypes.ADDRESSED_TACTICAL_IDENTIFY:
      return { ...state, tacticalIdentify: true };
    case actionTypes.ADDRESSED_TACTICAL_COOL:
      return { ...state, tacticalCool: true };
    case actionTypes.ADDRESSED_TACTICAL_EXTINGUISH:
      return { ...state, tacticalExtinguish: true };
    case actionTypes.ADDRESSED_TACTICAL_RESCUE:
      return { ...state, tacticalRescue: true };
    case actionTypes.ADDRESSED_TACTICAL_SALVAGE:
      return { ...state, tacticalSalvage: true };
    case actionTypes.ADDRESSED_STRATEGIC_RESCUE:
      return { ...state, strategicRescue: true };
    case actionTypes.ADDRESSED_STRATEGIC_EXPOSURES:
      return { ...state, strategicExposures: true };
    case actionTypes.ADDRESSED_STRATEGIC_CONFINEMENT:
      return { ...state, strategicConfinement: true };
    case actionTypes.ADDRESSED_STRATEGIC_EXTINGUISHMENT:
      return { ...state, strategicExtinguishment: true };
    case actionTypes.ADDRESSED_STRATEGIC_OVERHAUL:
      return { ...state, strategicOverhaul: true };
    case actionTypes.ADDRESSED_STRATEGIC_VENTILATION:
      return { ...state, strategicVentilation: true };
    case actionTypes.ADDRESSED_STRATEGIC_SALVAGE:
      return { ...state, strategicSalvage: true };
    case actionTypes.ADDRESSED_INCIDENT:
      return { ...state, incident: true };
    case actionTypes.ADDRESSED_PAR:
      return { ...state, par: true };
    case actionTypes.ADDRESSED_CAN:
      return { ...state, can: true };
    case actionTypes.ADDRESSED_TRANSFER_ASSIGNMENTS:
      return { ...state, transferAssignments: true };
    default:
      return state;
  }
};

export default reducer;

export { initialState };
