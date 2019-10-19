const hashPassword = require('./helpers/hashPassword')
const comparePassword = require('./helpers/comparePassword')
const {
  createRefreshToken,
  createAccessToken
} = require('../../../helpers/createTokens')

const authenticated = require('./middlewares/authenticated')

const resolvers = {
  Query: {
    bye: authenticated((_, args, context, info) => {
      return 'Bye'
    }),
    me: authenticated((_, args, { userID, db }, info) => {
      return db.query.user(
        {
          where: {
            id: userID
          }
        },
        info
      )
    })
  },
  Mutation: {
    register: async (_, { userName, email, password }, { db, res }, info) => {
      const exists = await db.exists.User({
        email
      })
      if (exists) {
        throw new Error('email is already exists')
      }
      const hashedPassword = await hashPassword(password)

      const user = await db.mutation.createUser(
        {
          data: {
            userName,
            email,
            password: hashedPassword
          }
        },
        `{
        id
        email
        tokenVersion
      }`
      )
      res.cookie('wys-jid', createRefreshToken(user), {
        httpOnly: true,
        path: '/refresh_token'
      })
      return {
        email,
        accessToken: createAccessToken(user),
        userName
      }
    },
    login: async (_, { email, password }, { db, res }, info) => {
      const user = await db.query.user(
        { where: { email } },
        `{
        password
        id
        userName
        email
        tokenVersion
      }`
      )
      if (!user) throw new Error("Couldn't find user")
      const valid = await comparePassword({ password, hash: user.password })
      if (!valid) throw new Error('bad password')

      res.cookie('wys-jid', createRefreshToken(user), {
        httpOnly: true,
        path: '/refresh_token'
      })

      return {
        email,
        userName: user.userName,
        accessToken: createAccessToken(user)
      }
    },
    logout: (_, args, { res }, info) => {
      res.cookie('wys-jid', '', {
        httpOnly: true,
        path: '/refresh_token'
      })
      return true
    }
  }
}

module.exports = resolvers
