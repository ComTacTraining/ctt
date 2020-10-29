const options = {
  initialReportSize: [ 'small', 'medium', 'large', 'mega', 'square feet' ],
  initialReportHeight: [ 'story', 'single', '2', 'two', '3', 'three', 'rise', 'mid', 'high' ],
  initialReportOccupancy: [ 'residential', 'single-family', 'single', 'family', 'dwelling', 'multi-family', 'apartment', 'garden', 'call', 'townhome', 'town', 'home', 'condo', 'condominium', 'duplex', 'office',  'business', 'warehouse', 'medical', 'retail', 'apartment', 'house', 'Center Hall', 'commercial', 'taxpayer', 'industrial', 'building', 'Warehouse', 'tiltup', 'retail' ],
  initialReportConditions: [ 'smoke', 'showing', 'fire', 'nothing' ],
  initialReportActions: [ 'laying', 'supply', 'line', 'lines', 'establishing', 'water', 'supply', 'entering', 'rescue', 'mode', 'quick', 'attack',  'command', 'investigation', 'investigating', 'command', 'rescue' ],
  initialReportNeeds: [ 'second', '2nd', 'third', '3rd', 'alarm', 'police', 'pd', 'ambulance', 'public works', 'ems', 'officers', 'box', 'balance', 'additional','engine', 'truck','tender','tanker', ],
  initialReportDesignation: [ 'command', 'incident', 'IC', 'see', 'sea', 'eye' ],
  threeSixtyConstruction: [ 'light weight', 'lightweight', 'construction', 'ordinary', 'cut', 'stack', 'poured', 'place', 'concrete', 'tilt up', 'metal clad', 'stack', 'conventional', 'wood', 'frame', 'stucco', 'vinyl' 'sided', ],
  threeSixtyEntryEgress: ['alpha', 'bravo', 'charlie', 'delta'],
  threeSixtyConditions: [ 'structure', 'fire', 'room', 'contents',  'attic', 'basement' ],
  threeSixtyInteriorPath: [ 'bidirectional', 'bi-directional', 'unidirectional', 'uni-directional', 'exhaust', 'alpha', 'bravo', 'charlie', 'delta', 'intake'  ],
  threeSixtySurvivability: [ 'survivability', 'profile', 'positive', 'marginal', 'negative' ],
  threeSixtyStrategicMode: [ 'stategic', 'mode', 'offensive', 'defensive', 'transitional' ],
  assignmentRescue: [ 'rescue', 'search', 'primary', 'secondary', 'protect', 'remove', ],
  assignmentExposure: [ 'exposure', 'protect', 'eyes', 'extension',],
  assignmentConfinement: [ 'confinement', 'attack', 'Hold', 'Check', 'Limit', 'Restrict', 'Restrain' ],
  assignmentExtinguishment: [ 'extinguish', 'Attack', 'supress', 'supression'],
  assignmentOverhaul: [ 'overhaul', 'hot', 'spot' ],
  assignmentVentilation: [ 'ventilation', 'vent', 'roof', 'horizontal', 'vertical', 'positive', 'blower', 'hole'],
  assignmentSalvage: [ 'salvage', 'covers', 'conservation', 'property' ],
  incidentWithinIncident: [ 'incident' ]
}

export { options };
