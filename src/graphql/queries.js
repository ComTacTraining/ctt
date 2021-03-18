/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
        createdAt
        updatedAt
      }
      nextToken
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
        createdAt
        updatedAt
      }
      nextToken
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
        createdAt
        updatedAt
      }
      nextToken
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
