/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvolution = `mutation CreateEvolution(
  $input: CreateEvolutionInput!
  $condition: ModelEvolutionConditionInput
) {
  createEvolution(input: $input, condition: $condition) {
    id
    category
    construction
    street
    size
    stories
    occupancy
    conditions
    entryEgress
    survivability
    placement
    side
    flow
    fire
    exhaust
    smoke
    withstanding
    attack
    ventilation
    exposure
    ric
    medical
  }
}
`;
export const updateEvolution = `mutation UpdateEvolution(
  $input: UpdateEvolutionInput!
  $condition: ModelEvolutionConditionInput
) {
  updateEvolution(input: $input, condition: $condition) {
    id
    category
    construction
    street
    size
    stories
    occupancy
    conditions
    entryEgress
    survivability
    placement
    side
    flow
    fire
    exhaust
    smoke
    withstanding
    attack
    ventilation
    exposure
    ric
    medical
  }
}
`;
export const deleteEvolution = `mutation DeleteEvolution(
  $input: DeleteEvolutionInput!
  $condition: ModelEvolutionConditionInput
) {
  deleteEvolution(input: $input, condition: $condition) {
    id
    category
    construction
    street
    size
    stories
    occupancy
    conditions
    entryEgress
    survivability
    placement
    side
    flow
    fire
    exhaust
    smoke
    withstanding
    attack
    ventilation
    exposure
    ric
    medical
  }
}
`;
export const createMember = `mutation CreateMember(
  $input: CreateMemberInput!
  $condition: ModelMemberConditionInput
) {
  createMember(input: $input, condition: $condition) {
    id
    alias
    department
    rank
    dispatchCenter
    firstOnScene
    incomingCommandOfficer
    alarm1
    alarm2
    alarm3
    showTips
    expiration
    owner
  }
}
`;
export const updateMember = `mutation UpdateMember(
  $input: UpdateMemberInput!
  $condition: ModelMemberConditionInput
) {
  updateMember(input: $input, condition: $condition) {
    id
    alias
    department
    rank
    dispatchCenter
    firstOnScene
    incomingCommandOfficer
    alarm1
    alarm2
    alarm3
    showTips
    expiration
    owner
  }
}
`;
export const deleteMember = `mutation DeleteMember(
  $input: DeleteMemberInput!
  $condition: ModelMemberConditionInput
) {
  deleteMember(input: $input, condition: $condition) {
    id
    alias
    department
    rank
    dispatchCenter
    firstOnScene
    incomingCommandOfficer
    alarm1
    alarm2
    alarm3
    showTips
    expiration
    owner
  }
}
`;
export const createIncident = `mutation CreateIncident(
  $input: CreateIncidentInput!
  $condition: ModelIncidentConditionInput
) {
  createIncident(input: $input, condition: $condition) {
    id
    title
    icsNims
    command
  }
}
`;
export const updateIncident = `mutation UpdateIncident(
  $input: UpdateIncidentInput!
  $condition: ModelIncidentConditionInput
) {
  updateIncident(input: $input, condition: $condition) {
    id
    title
    icsNims
    command
  }
}
`;
export const deleteIncident = `mutation DeleteIncident(
  $input: DeleteIncidentInput!
  $condition: ModelIncidentConditionInput
) {
  deleteIncident(input: $input, condition: $condition) {
    id
    title
    icsNims
    command
  }
}
`;
