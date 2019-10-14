const { createServer } = require('http')
const server = require('./apollo')
const app = require('./app')

const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

module.exports = httpServer
