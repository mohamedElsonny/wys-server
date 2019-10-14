const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const { prisma } = require('../prisma/binding')
const whitelist = require('../config/whitelist')
const {
  createAccessToken,
  createRefreshToken
} = require('../helpers/createTokens')

const app = express()

app.use(
  cors({
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS!'))
      }
    }
  })
)
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/refresh_token', async (req, res) => {
  const token = req.cookies['wys-jid']
  if (!token) {
    return res.send({ ok: false, accessToken: '' })
  }

  let payload = null
  try {
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
  } catch (err) {
    console.log(err)
    return res.send({ ok: false, accessToken: '' })
  }

  const user = await prisma.query.user(
    {
      where: {
        id: payload.userid
      }
    },
    '{id email tokenVersion}'
  )
  if (!user) {
    return res.send({ ok: false, accessToken: '' })
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return res.send({ ok: false, accessToken: '' })
  }

  res.cookie('wys-jid', createRefreshToken(user), {
    httpOnly: true
  })

  return res.send({
    ok: true,
    accessToken: createAccessToken(user)
  })
})

module.exports = app
