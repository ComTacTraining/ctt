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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createStripe = /* GraphQL */ `
  mutation CreateStripe(
    $input: CreateStripeInput!
    $condition: ModelStripeConditionInput
  ) {
    createStripe(input: $input, condition: $condition) {
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
export const updateStripe = /* GraphQL */ `
  mutation UpdateStripe(
    $input: UpdateStripeInput!
    $condition: ModelStripeConditionInput
  ) {
    updateStripe(input: $input, condition: $condition) {
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
export const deleteStripe = /* GraphQL */ `
  mutation DeleteStripe(
    $input: DeleteStripeInput!
    $condition: ModelStripeConditionInput
  ) {
    deleteStripe(input: $input, condition: $condition) {
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
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
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
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
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
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
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
export const createReview = /* GraphQL */ `
  mutation CreateReview(
    $input: CreateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    createReview(input: $input, condition: $condition) {
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
export const updateReview = /* GraphQL */ `
  mutation UpdateReview(
    $input: UpdateReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    updateReview(input: $input, condition: $condition) {
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
export const deleteReview = /* GraphQL */ `
  mutation DeleteReview(
    $input: DeleteReviewInput!
    $condition: ModelReviewConditionInput
  ) {
    deleteReview(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
