import * as actionTypes from '@/store/actions/tips'

const initialState = {
  initialReportSize: false,
  initialReportHeight: false,
  initialReportOccupancy: false,
  initialReportConditions: false,
  initialReportActions: false,
  initialReportNeeds: false,
  initialReportDesignation: false,
  threeSixtyConstruction: false,
  threeSixtyEntryEgress: false,
  threeSixtyConditions: false,
  threeSixtyInteriorPath: false,
  threeSixtySurvivability: false,
  threeSixtyStrategicMode: false,
  assignmentRescue: false,
  assignmentExposure: false,
  assignmentConfinement: false,
  assignmentExtinguishment: false,
  assignmentOverhaul: false,
  assignmentVentilation: false,
  assignmentSalvage: false,
  canReport: false,
  parReport: false,
  incidentWithinIncident: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADDRESSED_INITIAL_REPORT_SIZE:
      return { ...state, initialReportSize: true }
    case actionTypes.ADDRESSED_INITIAL_REPORT_HEIGHT:
      return { ...state, initialReportHeight: true }
    case actionTypes.ADDRESSED_INITIAL_REPORT_OCCUPANCY:
      return { ...state, initialReportOccupancy: true }
    case actionTypes.ADDRESSED_INITIAL_REPORT_CONDITIONS:
      return { ...state, initialReportConditions: true }
    case actionTypes.ADDRESSED_INITIAL_REPORT_ACTIONS:
      return { ...state, initialReportActions: true }
    case actionTypes.ADDRESSED_INITIAL_REPORT_NEEDS:
      return { ...state, initialReportNeeds: true }
    case actionTypes.ADDRESSED_INITIAL_REPORT_DESIGNATION:
      return { ...state, initialReportDesignation: true }
    case actionTypes.ADDRESSED_THREE_SIXTY_CONSTRUCTION:
      return { ...state, threeSixtyConstruction: true }
    case actionTypes.ADDRESSED_THREE_SIXTY_ENTRY_EGRESS:
      return { ...state, threeSixtyEntryEgress: true }
    case actionTypes.ADDRESSED_THREE_SIXTY_CONDITIONS:
      return { ...state, threeSixtyConditions: true }
    case actionTypes.ADDRESSED_THREE_SIXTY_INTERIOR_PATH:
      return { ...state, threeSixtyInteriorPath: true }
    case actionTypes.ADDRESSED_THREE_SIXTY_SURVIVABILITY:
      return { ...state, threeSixtySurvivability: true }
    case actionTypes.ADDRESSED_THREE_SIXTY_STRATEGIC_MODE:
      return { ...state, threeSixtyStrategicMode: true }
    case actionTypes.ADDRESSED_ASSIGNMENT_RESCUE:
      return { ...state, assignmentRescue: true }
    case actionTypes.ADDRESSED_ASSIGNMENT_EXPOSURE:
      return { ...state, assignmentExposure: true }
    case actionTypes.ADDRESSED_ASSIGNMENT_CONFINEMENT:
      return { ...state, assignmentConfinement: true }
    case actionTypes.ADDRESSED_ASSIGNMENT_EXTINGUISHMENT:
      return { ...state, assignmentExtinguishment: true }
    case actionTypes.ADDRESSED_ASSIGNMENT_OVERHAUL:
      return { ...state, assignmentOverhaul: true }
    case actionTypes.ADDRESSED_ASSIGNMENT_VENTILATION:
      return { ...state, assignmentVentilation: true }
    case actionTypes.ADDRESSED_ASSIGNMENT_SALVAGE:
      return { ...state, assignmentSalvage: true }
    case actionTypes.ADDRESSED_CAN_REPORT:
      return { ...state, canReport: true }
    case actionTypes.ADDRESSED_PAR_REPORT:
      return { ...state, parReport: true }
    case actionTypes.ADDRESSED_INCIDENT_WITHIN_INCIDENT:
      return { ...state, incidentWithinIncident: true }
    case actionTypes.RESET_TIPS:
      return { ...initialState }
    default:
      return state
  }
}

export default reducer

export { initialState }
