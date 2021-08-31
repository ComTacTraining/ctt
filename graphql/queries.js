/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOption = /* GraphQL */ `
  query GetOption($id: ID!) {
    getOption(id: $id) {
      id
      name
      value
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listOptions = /* GraphQL */ `
  query ListOptions(
    $filter: ModelOptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOptions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        value
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
export const optionByName = /* GraphQL */ `
  query OptionByName(
    $name: String
    $sortDirection: ModelSortDirection
    $filter: ModelOptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    optionByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        value
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
export const syncOptions = /* GraphQL */ `
  query SyncOptions(
    $filter: ModelOptionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOptions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        value
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
export const getReview = /* GraphQL */ `
  query GetReview($id: ID!) {
    getReview(id: $id) {
      id
      autoScore
      selfScore
      transcript
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
      Evolution {
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
        salvage
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
        Evolution {
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
          salvage
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
        Evolution {
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
          salvage
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
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
      salvage
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
        salvage
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
        salvage
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
        salvage
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
        salvage
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
