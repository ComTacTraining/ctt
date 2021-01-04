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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEvolutions = /* GraphQL */ `
  query SyncEvolutions(
    $filter: ModelEvolutionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEvolutions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncIncidents = /* GraphQL */ `
  query SyncIncidents(
    $filter: ModelIncidentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncIncidents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getStripe = /* GraphQL */ `
  query GetStripe($id: ID!) {
    getStripe(id: $id) {
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
export const listStripes = /* GraphQL */ `
  query ListStripes(
    $filter: ModelStripeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStripes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const stripeByUsername = /* GraphQL */ `
  query StripeByUsername(
    $username: String
    $sortDirection: ModelSortDirection
    $filter: ModelStripeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    stripeByUsername(
      username: $username
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncStripes = /* GraphQL */ `
  query SyncStripes(
    $filter: ModelStripeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncStripes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
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
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncProfiles = /* GraphQL */ `
  query SyncProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getReview = /* GraphQL */ `
  query GetReview($id: ID!) {
    getReview(id: $id) {
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
export const listReviews = /* GraphQL */ `
  query ListReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      }
      nextToken
      startedAt
    }
  }
`;
export const syncReviews = /* GraphQL */ `
  query SyncReviews(
    $filter: ModelReviewFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncReviews(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      }
      nextToken
      startedAt
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
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
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const commentsByReviewId = /* GraphQL */ `
  query CommentsByReviewId(
    $reviewId: ID
    $sortDirection: ModelSortDirection
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    commentsByReviewId(
      reviewId: $reviewId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncComments = /* GraphQL */ `
  query SyncComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncComments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
