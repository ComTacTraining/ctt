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
export const updateMember = `mutation UpdateMember(
  $input: UpdateMemberInput!
  $condition: ModelMemberConditionInput
) {
  updateMember(input: $input, condition: $condition) {
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
export const deleteMember = `mutation DeleteMember(
  $input: DeleteMemberInput!
  $condition: ModelMemberConditionInput
) {
  deleteMember(input: $input, condition: $condition) {
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
export const createAlarm = `mutation CreateAlarm(
  $input: CreateAlarmInput!
  $condition: ModelAlarmConditionInput
) {
  createAlarm(input: $input, condition: $condition) {
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
export const updateAlarm = `mutation UpdateAlarm(
  $input: UpdateAlarmInput!
  $condition: ModelAlarmConditionInput
) {
  updateAlarm(input: $input, condition: $condition) {
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
export const deleteAlarm = `mutation DeleteAlarm(
  $input: DeleteAlarmInput!
  $condition: ModelAlarmConditionInput
) {
  deleteAlarm(input: $input, condition: $condition) {
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
export const createSimulation = `mutation CreateSimulation(
  $input: CreateSimulationInput!
  $condition: ModelSimulationConditionInput
) {
  createSimulation(input: $input, condition: $condition) {
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
export const updateSimulation = `mutation UpdateSimulation(
  $input: UpdateSimulationInput!
  $condition: ModelSimulationConditionInput
) {
  updateSimulation(input: $input, condition: $condition) {
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
export const deleteSimulation = `mutation DeleteSimulation(
  $input: DeleteSimulationInput!
  $condition: ModelSimulationConditionInput
) {
  deleteSimulation(input: $input, condition: $condition) {
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
export const createReview = `mutation CreateReview(
  $input: CreateReviewInput!
  $condition: ModelReviewConditionInput
) {
  createReview(input: $input, condition: $condition) {
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
export const updateReview = `mutation UpdateReview(
  $input: UpdateReviewInput!
  $condition: ModelReviewConditionInput
) {
  updateReview(input: $input, condition: $condition) {
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
export const deleteReview = `mutation DeleteReview(
  $input: DeleteReviewInput!
  $condition: ModelReviewConditionInput
) {
  deleteReview(input: $input, condition: $condition) {
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
