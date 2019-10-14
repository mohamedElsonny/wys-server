const server = require('./server')
const port = process.env.CUSTOM_PORT || 8000

server.listen({ port }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath} , env: ${
      process.env.NODE_ENV
    }`
  )
)
