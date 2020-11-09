/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvolution = `query GetEvolution($id: ID!) {
  getEvolution(id: $id) {
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
export const listEvolutions = `query ListEvolutions(
  $filter: ModelEvolutionFilterInput
  $limit: Int
  $nextToken: String
) {
  listEvolutions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getIncident = `query GetIncident($id: ID!) {
  getIncident(id: $id) {
    id
    title
    icsNims
    command
  }
}
`;
export const listIncidents = `query ListIncidents(
  $filter: ModelIncidentFilterInput
  $limit: Int
  $nextToken: String
) {
  listIncidents(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      icsNims
      command
    }
    nextToken
  }
}
`;
export const getProfile = `query GetProfile($id: ID!) {
  getProfile(id: $id) {
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
export const listProfiles = `query ListProfiles(
  $filter: ModelProfileFilterInput
  $limit: Int
  $nextToken: String
) {
  listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
  }
}
`;
export const getSubscription = `query GetSubscription($id: ID!) {
  getSubscription(id: $id) {
    id
    user
    stripeCustomerId
    stripeSubscriptionId
  }
}
`;
export const listSubscriptions = `query ListSubscriptions(
  $filter: ModelSubscriptionFilterInput
  $limit: Int
  $nextToken: String
) {
  listSubscriptions(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user
      stripeCustomerId
      stripeSubscriptionId
    }
    nextToken
  }
}
`;
