/* eslint-disable */
const {
  SchemaDirectiveVisitor,
  AuthenticationError,
} = require('apollo-server-express')
const { defaultFieldResolver } = require('graphql')
const jwt = require('jsonwebtoken')

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = async function(parent, args, context, info) {
      // Get the required Role from the field first, falling back
      // to the objectType if no Role is required by the field:

      const authorization = context.req.headers['authorization']
      if (!authorization) throw new AuthenticationError('not authenticated')

      try {
        const token = authorization.split(' ')[1]
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        context.userID = payload.userid
      } catch (err) {
        console.log(err)
        throw new AuthenticationError('not authenticated')
      }

      return resolve.call(this, parent, args, context, info)
    }
  }
}

module.exports = AuthDirective
