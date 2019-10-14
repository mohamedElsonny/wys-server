const bcrypt = require('bcryptjs')

module.exports = async password => {
  try {
    const salt = await bcrypt.genSalt(15)
    const hash = await bcrypt.hash(password, salt)

    return hash
  } catch (ex) {
    console.log(ex)
  }
}
