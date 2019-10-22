const resolvers = require('./resolvers')
const typeDefs = require('./schema')
const context = require('./context')
const { AuthenticatedDirective } = require('./directives')

module.exports = {
  typeDefs,
  resolvers,
  context,
  directives: {
    AuthenticatedDirective
  }
}
