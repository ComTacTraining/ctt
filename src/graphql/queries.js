/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvolution = /* GraphQL */ `
  query GetEvolution($id: ID!) {
    getEvolution(id: $id) {
      id
      category
      street
      size
      stories
      occupancy
      conditions
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listEvolutions = /* GraphQL */ `
  query ListEvolutions(
    $filter: ModelEvolutionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvolutions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        category
        street
        size
        stories
        occupancy
        conditions
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEvolutions = /* GraphQL */ `
  query SyncEvolutions(
    $filter: ModelEvolutionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEvolutions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        category
        street
        size
        stories
        occupancy
        conditions
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getIncident = /* GraphQL */ `
  query GetIncident($id: ID!) {
    getIncident(id: $id) {
      id
      title
      icsNims
      command
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listIncidents = /* GraphQL */ `
  query ListIncidents(
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncIncidents = /* GraphQL */ `
  query SyncIncidents(
    $filter: ModelIncidentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncIncidents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        icsNims
        command
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
      username
      department
      rank
      dispatchCenter
      firstOnScene
      incomingCommandOfficer
      alarm1
      alarm2
      alarm3
      showTips
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        department
        rank
        dispatchCenter
        firstOnScene
        incomingCommandOfficer
        alarm1
        alarm2
        alarm3
        showTips
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncProfiles = /* GraphQL */ `
  query SyncProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        username
        department
        rank
        dispatchCenter
        firstOnScene
        incomingCommandOfficer
        alarm1
        alarm2
        alarm3
        showTips
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
