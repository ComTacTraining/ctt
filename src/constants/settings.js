export default {
  voices: [
    'Joanna',
    'Kendra',
    'Kimberly',
    'Salli',
    'Joey',
    'Matthew',
    'Geraint',
    'Russell',
    'Brian',
  ],
  dispatchCenterVoice: 'Joanna',
  incomingCommandOfficerVoice: 'Brian',
  maxAdditionalAlarmSeconds: 100,
  maxUnitArrivalSeconds: 60,
  maxIncomingOfficerArrivalSeconds: 60,
  educationVoice: 'Matthew',
  initialReportTerms: [
    'feet',
    'story',
    'rise',
    'residential',
    'commercial',
    'industrial',
    'yard',
    'family',
    'dwelling',
    'apartment',
    'office',
    'house',
    'warehouse',
    'tiltup',
    'retail',
    'small',
    'medium',
    'large',
  ],
  threeSixtyAssessmentTerms: [
    'room',
    'content',
    'attic',
    'basement',
    'structure',
    'fire',
    'bidirectional',
    'bi-directional',
    'unidirectional',
    'uni-directional',
    'survivability',
    'profile',
    'exhaust',
    'intake',
    'positive',
    'marginal',
    'negative',
    'entry',
    'egress',
  ],
  icsNimsGroups: [
    {
      name: 'Water',
      terms: ['supply', 'line', 'hydrant', 'water']
    },
    {
      name: 'Fire Attack',
      terms: ['attack', 'attach', 'rescue', 'interior'],
      canReports: [
        {
          type: WITHSTANDING_WITHOUT_NEEDS,
          response:
            'The building is withstanding the insult, we are advancing and we do not need any additional resources at this time.',
        },
        {
          type: WITHSTANDING_WITH_NEEDS,
          response:
            'The building is withstanding the insult, we are advancing and we could use additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITHOUT_NEEDS,
          response:
            'The building is NOT withstanding the insult, we are evacuating the building and we do not need additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITH_NEEDS,
          response:
            'The building is NOT withstanding the insult, we are stalemated and we could use additional resources.',
        },
      ],
    },
    {
      name: 'Ventilation',
      terms: ['ventilation'],
      canReports: [
        {
          type: WITHSTANDING_WITHOUT_NEEDS,
          response:
            'The building is withstanding the insult, we are ventilating and we do not need any additional resources at this time.',
        },
        {
          type: WITHSTANDING_WITH_NEEDS,
          response:
            'The building is withstanding the insult, we are ventilating and we could use additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITHOUT_NEEDS,
          response:
            'The building is NOT withstanding the insult, we are evacuating the building and we do not need additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITH_NEEDS,
          response:
            'The building is NOT withstanding the insult, we are unable to ventilate, moving to a safer location and we could use additional resources.',
        },
      ],
    },
    {
      name: 'Exposure',
      terms: ['exposure'],
      canReports: [
        {
          type: WITHSTANDING_WITHOUT_NEEDS,
          response:
            'The exposure is withstanding the insult, we are protecting the exposures and we do not need any additional resources at this time.',
        },
        {
          type: WITHSTANDING_WITH_NEEDS,
          response:
            'The exposure is withstanding the insult, we are protecting the exposures and could use additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITHOUT_NEEDS,
          response:
            'The building is NOT withstanding the insult, we are retreating to a safer location and we do not need additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITH_NEEDS,
          response:
            'The building is NOT withstanding the insult, we are unable to protect the exposures, we are retreating to a safer location and we could use additional resources.',
        },
      ],
    },
    {
      name: 'RIC',
      terms: ['ric', 'rick', 'on deck', 'deck'],
      canReports: [
        {
          type: WITHSTANDING_WITHOUT_NEEDS,
          response:
            'We are in position and are softening the building. All IDLH resources are located, we do not need any additional resources.',
        },
        {
          type: WITHSTANDING_WITH_NEEDS,
          response:
            'We are in position and are softening the building. All IDLH resources are located, we could use additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITHOUT_NEEDS,
          response: 'RIC CAN REPORT NOT WITHSTANDING WITHOUT NEEDS',
        },
        {
          type: NOT_WITHSTANDING_WITH_NEEDS,
          response:
            'We are in position and having difficulty softening the building.  Not all IDLH resources are located, we could use additional resources.',
        },
      ],
    },
    {
      name: 'Medical',
      terms: ['med', 'medical'],
      canReports: [
        {
          type: WITHSTANDING_WITHOUT_NEEDS,
          response:
            'We are currently triaging and treating all patients. We do not need any additional resources.',
        },
        {
          type: WITHSTANDING_WITH_NEEDS,
          response:
            'We are currently triaging and treating all patients. We need additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITHOUT_NEEDS,
          response:
            'We are evacuating patients. We do not need any additional resources.',
        },
        {
          type: NOT_WITHSTANDING_WITH_NEEDS,
          response: 'We are evacuating patients. We need additional resources.',
        },
      ],
    },
  ],
  parReport: 'All present and accounted for.',
};
