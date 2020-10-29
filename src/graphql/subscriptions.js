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
export const onCreateAlarm = `subscription OnCreateAlarm($owner: String) {
  onCreateAlarm(owner: $owner) {
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
export const onUpdateAlarm = `subscription OnUpdateAlarm($owner: String) {
  onUpdateAlarm(owner: $owner) {
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
export const onDeleteAlarm = `subscription OnDeleteAlarm($owner: String) {
  onDeleteAlarm(owner: $owner) {
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
