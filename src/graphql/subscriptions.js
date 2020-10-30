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
export const onCreateMember = `subscription OnCreateMember($owner: String) {
  onCreateMember(owner: $owner) {
    id
    alias
    department
    rank
    dispatchCenter
    firstOnScene
    incomingCommandOfficer
    alarm1
    alarm2
    alarm3
    showTips
    expiration
    owner
  }
}
`;
export const onUpdateMember = `subscription OnUpdateMember($owner: String) {
  onUpdateMember(owner: $owner) {
    id
    alias
    department
    rank
    dispatchCenter
    firstOnScene
    incomingCommandOfficer
    alarm1
    alarm2
    alarm3
    showTips
    expiration
    owner
  }
}
`;
export const onDeleteMember = `subscription OnDeleteMember($owner: String) {
  onDeleteMember(owner: $owner) {
    id
    alias
    department
    rank
    dispatchCenter
    firstOnScene
    incomingCommandOfficer
    alarm1
    alarm2
    alarm3
    showTips
    expiration
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
