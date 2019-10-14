const jwt = require('jsonwebtoken')

exports.createAccessToken = ({ id, email }) =>
  jwt.sign({ userid: id, email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m'
  })

exports.createRefreshToken = ({ id, email, tokenVersion }) =>
  jwt.sign(
    { userid: id, email, tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '7d'
    }
  )
