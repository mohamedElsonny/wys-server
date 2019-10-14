const userResolvers = require('./svc/user-svc/resolvers')

module.exports = {
  Query: {
    ...userResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation
  }
}
