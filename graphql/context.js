const { prisma } = require('../prisma/binding')

module.exports = ({ res, req }) => {
  return {
    res,
    req,
    db: prisma
  }
}
