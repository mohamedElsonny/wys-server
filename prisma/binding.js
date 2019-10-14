const { Prisma } = require('prisma-binding')
const path = require('path')

const prisma = new Prisma({
  typeDefs: path.resolve(__dirname, '../generated/prisma.graphql'),
  endpoint: `${process.env.PRISMA_ENDPOINT}/${process.env.PRISMA_DB}/${
    process.env.PRISMA_STAGE
  }`,
  debug: false
})

module.exports = {
  prisma
}
