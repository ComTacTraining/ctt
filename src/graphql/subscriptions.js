/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvolution = /* GraphQL */ `
  subscription OnCreateEvolution {
    onCreateEvolution {
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
export const onUpdateEvolution = /* GraphQL */ `
  subscription OnUpdateEvolution {
    onUpdateEvolution {
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
export const onDeleteEvolution = /* GraphQL */ `
  subscription OnDeleteEvolution {
    onDeleteEvolution {
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
export const onCreateIncident = /* GraphQL */ `
  subscription OnCreateIncident {
    onCreateIncident {
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
export const onUpdateIncident = /* GraphQL */ `
  subscription OnUpdateIncident {
    onUpdateIncident {
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
export const onDeleteIncident = /* GraphQL */ `
  subscription OnDeleteIncident {
    onDeleteIncident {
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
export const onCreateStripe = /* GraphQL */ `
  subscription OnCreateStripe {
    onCreateStripe {
      id
      username
      stripeCustomerId
      stripeSubscriptionId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStripe = /* GraphQL */ `
  subscription OnUpdateStripe {
    onUpdateStripe {
      id
      username
      stripeCustomerId
      stripeSubscriptionId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStripe = /* GraphQL */ `
  subscription OnDeleteStripe {
    onDeleteStripe {
      id
      username
      stripeCustomerId
      stripeSubscriptionId
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateProfile = /* GraphQL */ `
  subscription OnCreateProfile($username: String) {
    onCreateProfile(username: $username) {
      id
      username
      department
      rank
      dispatchCenter
      firstOnScene
      incomingCommandOfficer
      alarm1
      alarm2
      alarm3
      showTips
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProfile = /* GraphQL */ `
  subscription OnUpdateProfile($username: String) {
    onUpdateProfile(username: $username) {
      id
      username
      department
      rank
      dispatchCenter
      firstOnScene
      incomingCommandOfficer
      alarm1
      alarm2
      alarm3
      showTips
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProfile = /* GraphQL */ `
  subscription OnDeleteProfile($username: String) {
    onDeleteProfile(username: $username) {
      id
      username
      department
      rank
      dispatchCenter
      firstOnScene
      incomingCommandOfficer
      alarm1
      alarm2
      alarm3
      showTips
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onCreateReview = /* GraphQL */ `
  subscription OnCreateReview {
    onCreateReview {
      id
      username
      name
      transcript
      score
      selfScore
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      comments {
        nextToken
        startedAt
      }
    }
  }
`;
export const onUpdateReview = /* GraphQL */ `
  subscription OnUpdateReview {
    onUpdateReview {
      id
      username
      name
      transcript
      score
      selfScore
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      comments {
        nextToken
        startedAt
      }
    }
  }
`;
export const onDeleteReview = /* GraphQL */ `
  subscription OnDeleteReview {
    onDeleteReview {
      id
      username
      name
      transcript
      score
      selfScore
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      comments {
        nextToken
        startedAt
      }
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      username
      reviewId
      message
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      username
      reviewId
      message
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      username
      reviewId
      message
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
