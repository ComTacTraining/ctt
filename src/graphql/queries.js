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
    expiration
    alarms {
      items {
        id
        unit
        officer
        owner
      }
      nextToken
    }
    simulations {
      items {
        id
        link
      }
      nextToken
    }
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
      expiration
      alarms {
        nextToken
      }
      simulations {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getAlarm = `query GetAlarm($id: ID!) {
  getAlarm(id: $id) {
    id
    unit
    officer
    member {
      id
      alias
      department
      rank
      expiration
      alarms {
        nextToken
      }
      simulations {
        nextToken
      }
    }
    owner
  }
}
`;
export const listAlarms = `query ListAlarms(
  $filter: ModelAlarmFilterInput
  $limit: Int
  $nextToken: String
) {
  listAlarms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      unit
      officer
      member {
        id
        alias
        department
        rank
        expiration
      }
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
export const getSimulation = `query GetSimulation($id: ID!) {
  getSimulation(id: $id) {
    id
    member {
      id
      alias
      department
      rank
      expiration
      alarms {
        nextToken
      }
      simulations {
        nextToken
      }
    }
    link
    reviews {
      id
      member {
        id
        alias
        department
        rank
        expiration
      }
      message
    }
  }
}
`;
export const listSimulations = `query ListSimulations(
  $filter: ModelSimulationFilterInput
  $limit: Int
  $nextToken: String
) {
  listSimulations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      member {
        id
        alias
        department
        rank
        expiration
      }
      link
      reviews {
        id
        message
      }
    }
    nextToken
  }
}
`;
export const getReview = `query GetReview($id: ID!) {
  getReview(id: $id) {
    id
    member {
      id
      alias
      department
      rank
      expiration
      alarms {
        nextToken
      }
      simulations {
        nextToken
      }
    }
    message
  }
}
`;
export const listReviews = `query ListReviews(
  $filter: ModelReviewFilterInput
  $limit: Int
  $nextToken: String
) {
  listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      member {
        id
        alias
        department
        rank
        expiration
      }
      message
    }
    nextToken
  }
}
`;
