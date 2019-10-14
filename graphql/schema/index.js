const { importSchema } = require('graphql-import')
const path = require('path')

const db = importSchema(
  path.resolve(__dirname, '../../generated/prisma.graphql')
)

const typeDefs = importSchema(path.resolve(__dirname, 'schema.graphql'), {
  db
})

module.exports = typeDefs
