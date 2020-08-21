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
export const createEvaluation = `mutation CreateEvaluation(
  $input: CreateEvaluationInput!
  $condition: ModelEvaluationConditionInput
) {
  createEvaluation(input: $input, condition: $condition) {
    id
    evaluation {
      id
      question
      answers
    }
  }
}
`;
export const updateEvaluation = `mutation UpdateEvaluation(
  $input: UpdateEvaluationInput!
  $condition: ModelEvaluationConditionInput
) {
  updateEvaluation(input: $input, condition: $condition) {
    id
    evaluation {
      id
      question
      answers
    }
  }
}
`;
export const deleteEvaluation = `mutation DeleteEvaluation(
  $input: DeleteEvaluationInput!
  $condition: ModelEvaluationConditionInput
) {
  deleteEvaluation(input: $input, condition: $condition) {
    id
    evaluation {
      id
      question
      answers
    }
  }
}
`;
export const createQuestion = `mutation CreateQuestion(
  $input: CreateQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  createQuestion(input: $input, condition: $condition) {
    id
    question
    answers
  }
}
`;
export const updateQuestion = `mutation UpdateQuestion(
  $input: UpdateQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  updateQuestion(input: $input, condition: $condition) {
    id
    question
    answers
  }
}
`;
export const deleteQuestion = `mutation DeleteQuestion(
  $input: DeleteQuestionInput!
  $condition: ModelQuestionConditionInput
) {
  deleteQuestion(input: $input, condition: $condition) {
    id
    question
    answers
  }
}
`;
export const createAnswer = `mutation CreateAnswer(
  $input: CreateAnswerInput!
  $condition: ModelAnswerConditionInput
) {
  createAnswer(input: $input, condition: $condition) {
    id
    question
    answer
    valid
  }
}
`;
export const updateAnswer = `mutation UpdateAnswer(
  $input: UpdateAnswerInput!
  $condition: ModelAnswerConditionInput
) {
  updateAnswer(input: $input, condition: $condition) {
    id
    question
    answer
    valid
  }
}
`;
export const deleteAnswer = `mutation DeleteAnswer(
  $input: DeleteAnswerInput!
  $condition: ModelAnswerConditionInput
) {
  deleteAnswer(input: $input, condition: $condition) {
    id
    question
    answer
    valid
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
    industry {
      id
      question
      answer
      valid
    }
    department {
      id
      question
      answer
      valid
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
    industry {
      id
      question
      answer
      valid
    }
    department {
      id
      question
      answer
      valid
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
    industry {
      id
      question
      answer
      valid
    }
    department {
      id
      question
      answer
      valid
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
