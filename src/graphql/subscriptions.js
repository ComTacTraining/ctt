/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvolution = `subscription OnCreateEvolution {
  onCreateEvolution {
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
export const onUpdateEvolution = `subscription OnUpdateEvolution {
  onUpdateEvolution {
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
export const onDeleteEvolution = `subscription OnDeleteEvolution {
  onDeleteEvolution {
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
export const onCreateMember = `subscription OnCreateMember {
  onCreateMember {
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
export const onUpdateMember = `subscription OnUpdateMember {
  onUpdateMember {
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
export const onDeleteMember = `subscription OnDeleteMember {
  onDeleteMember {
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
export const onCreateAlarm = `subscription OnCreateAlarm {
  onCreateAlarm {
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
export const onUpdateAlarm = `subscription OnUpdateAlarm {
  onUpdateAlarm {
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
export const onDeleteAlarm = `subscription OnDeleteAlarm {
  onDeleteAlarm {
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
export const onCreateIncident = `subscription OnCreateIncident {
  onCreateIncident {
    id
    title
    icsNims
    command
  }
}
`;
export const onUpdateIncident = `subscription OnUpdateIncident {
  onUpdateIncident {
    id
    title
    icsNims
    command
  }
}
`;
export const onDeleteIncident = `subscription OnDeleteIncident {
  onDeleteIncident {
    id
    title
    icsNims
    command
  }
}
`;
export const onCreateEvaluation = `subscription OnCreateEvaluation {
  onCreateEvaluation {
    id
    evaluation {
      id
      question
      answers
    }
  }
}
`;
export const onUpdateEvaluation = `subscription OnUpdateEvaluation {
  onUpdateEvaluation {
    id
    evaluation {
      id
      question
      answers
    }
  }
}
`;
export const onDeleteEvaluation = `subscription OnDeleteEvaluation {
  onDeleteEvaluation {
    id
    evaluation {
      id
      question
      answers
    }
  }
}
`;
export const onCreateQuestion = `subscription OnCreateQuestion {
  onCreateQuestion {
    id
    question
    answers
  }
}
`;
export const onUpdateQuestion = `subscription OnUpdateQuestion {
  onUpdateQuestion {
    id
    question
    answers
  }
}
`;
export const onDeleteQuestion = `subscription OnDeleteQuestion {
  onDeleteQuestion {
    id
    question
    answers
  }
}
`;
export const onCreateAnswer = `subscription OnCreateAnswer {
  onCreateAnswer {
    id
    question
    answer
    valid
  }
}
`;
export const onUpdateAnswer = `subscription OnUpdateAnswer {
  onUpdateAnswer {
    id
    question
    answer
    valid
  }
}
`;
export const onDeleteAnswer = `subscription OnDeleteAnswer {
  onDeleteAnswer {
    id
    question
    answer
    valid
  }
}
`;
export const onCreateSimulation = `subscription OnCreateSimulation {
  onCreateSimulation {
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
export const onUpdateSimulation = `subscription OnUpdateSimulation {
  onUpdateSimulation {
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
export const onDeleteSimulation = `subscription OnDeleteSimulation {
  onDeleteSimulation {
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
export const onCreateReview = `subscription OnCreateReview {
  onCreateReview {
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
export const onUpdateReview = `subscription OnUpdateReview {
  onUpdateReview {
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
export const onDeleteReview = `subscription OnDeleteReview {
  onDeleteReview {
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
