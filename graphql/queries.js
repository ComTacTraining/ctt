/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReview = /* GraphQL */ `
  query GetReview($id: ID!) {
    getReview(id: $id) {
      id
      autoScore
      selfScore
      transcript
      category
      number
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listReviews = /* GraphQL */ `
  query ListReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        autoScore
        selfScore
        transcript
        category
        number
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncReviews = /* GraphQL */ `
  query SyncReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncReviews(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        autoScore
        selfScore
        transcript
        category
        number
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getEvolution = /* GraphQL */ `
  query GetEvolution($id: ID!) {
    getEvolution(id: $id) {
      id
      number
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
        number
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
export const evolutionByCategory = /* GraphQL */ `
  query EvolutionByCategory(
    $category: Category
    $sortDirection: ModelSortDirection
    $filter: ModelEvolutionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    evolutionByCategory(
      category: $category
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        number
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
export const evolutionByCategoryNumber = /* GraphQL */ `
  query EvolutionByCategoryNumber(
    $category: Category
    $number: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEvolutionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    evolutionByCategoryNumber(
      category: $category
      number: $number
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        number
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
        number
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
