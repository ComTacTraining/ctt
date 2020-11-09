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
export const createProfile = `mutation CreateProfile(
  $input: CreateProfileInput!
  $condition: ModelProfileConditionInput
) {
  createProfile(input: $input, condition: $condition) {
    id
    user
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
  }
}
`;
export const updateProfile = `mutation UpdateProfile(
  $input: UpdateProfileInput!
  $condition: ModelProfileConditionInput
) {
  updateProfile(input: $input, condition: $condition) {
    id
    user
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
  }
}
`;
export const deleteProfile = `mutation DeleteProfile(
  $input: DeleteProfileInput!
  $condition: ModelProfileConditionInput
) {
  deleteProfile(input: $input, condition: $condition) {
    id
    user
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
  }
}
`;
export const createSubscription = `mutation CreateSubscription(
  $input: CreateSubscriptionInput!
  $condition: ModelSubscriptionConditionInput
) {
  createSubscription(input: $input, condition: $condition) {
    id
    user
    stripeCustomerId
    stripeSubscriptionId
  }
}
`;
export const updateSubscription = `mutation UpdateSubscription(
  $input: UpdateSubscriptionInput!
  $condition: ModelSubscriptionConditionInput
) {
  updateSubscription(input: $input, condition: $condition) {
    id
    user
    stripeCustomerId
    stripeSubscriptionId
  }
}
`;
export const deleteSubscription = `mutation DeleteSubscription(
  $input: DeleteSubscriptionInput!
  $condition: ModelSubscriptionConditionInput
) {
  deleteSubscription(input: $input, condition: $condition) {
    id
    user
    stripeCustomerId
    stripeSubscriptionId
  }
}
`;
