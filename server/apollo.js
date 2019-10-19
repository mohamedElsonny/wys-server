const { ApolloServer, makeExecutableSchema } = require('apollo-server-express')
const { typeDefs, resolvers, context } = require('../graphql')
const app = require('./app')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const server = new ApolloServer({
  schema,
  context
})

server.applyMiddleware({
  app,
  cors: false
})

module.exports = server
