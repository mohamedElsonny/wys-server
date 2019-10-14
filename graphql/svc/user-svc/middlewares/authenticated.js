/* eslint-disable */

const jwt = require('jsonwebtoken')

module.exports = next => (parent, args, context, info) => {
  const authorization = context.req.headers['authorization']
  if (!authorization) throw new Error('not authenticated')

  try {
    const token = authorization.split(' ')[1]
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    context.userID = payload.userid
  } catch (err) {
    console.log(err)
    throw new Error('not authenticated')
  }

  return next(parent, args, context, info)
}
