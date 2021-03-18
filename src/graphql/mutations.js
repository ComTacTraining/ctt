/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvolution = /* GraphQL */ `
  mutation CreateEvolution(
    $input: CreateEvolutionInput!
    $condition: ModelEvolutionConditionInput
  ) {
    createEvolution(input: $input, condition: $condition) {
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
export const updateEvolution = /* GraphQL */ `
  mutation UpdateEvolution(
    $input: UpdateEvolutionInput!
    $condition: ModelEvolutionConditionInput
  ) {
    updateEvolution(input: $input, condition: $condition) {
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
export const deleteEvolution = /* GraphQL */ `
  mutation DeleteEvolution(
    $input: DeleteEvolutionInput!
    $condition: ModelEvolutionConditionInput
  ) {
    deleteEvolution(input: $input, condition: $condition) {
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
export const createIncident = /* GraphQL */ `
  mutation CreateIncident(
    $input: CreateIncidentInput!
    $condition: ModelIncidentConditionInput
  ) {
    createIncident(input: $input, condition: $condition) {
      id
      title
      icsNims
      command
      createdAt
      updatedAt
    }
  }
`;
export const updateIncident = /* GraphQL */ `
  mutation UpdateIncident(
    $input: UpdateIncidentInput!
    $condition: ModelIncidentConditionInput
  ) {
    updateIncident(input: $input, condition: $condition) {
      id
      title
      icsNims
      command
      createdAt
      updatedAt
    }
  }
`;
export const deleteIncident = /* GraphQL */ `
  mutation DeleteIncident(
    $input: DeleteIncidentInput!
    $condition: ModelIncidentConditionInput
  ) {
    deleteIncident(input: $input, condition: $condition) {
      id
      title
      icsNims
      command
      createdAt
      updatedAt
    }
  }
`;
