const bcrypt = require('bcryptjs')

module.exports = ({ password, hash }) => {
  return bcrypt.compare(password, hash)
}
