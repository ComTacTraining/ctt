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
export const getMember = `query GetMember($id: ID!) {
  getMember(id: $id) {
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
export const listMembers = `query ListMembers(
  $filter: ModelMemberFilterInput
  $limit: Int
  $nextToken: String
) {
  listMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
