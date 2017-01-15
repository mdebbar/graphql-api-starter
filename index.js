const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const schema = require('./schema')

let PORT = 4000
if (process.env.PORT) {
  PORT = parseInt(process.env.PORT, 10)
}

const app = express()

// DEV_ONLY
// Logging in dev mode
app.use(morgan('dev'))

// TODO: After we implement authentication, we shouldn't need a whitelist.
//       We can just enable CORS for *
const whitelist = [
  'http://localhost:3000',
]

const corsOptions = {
  origin: function(origin, callback) {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1
    callback(null, originIsWhitelisted)
  },
}
app.use(cors(corsOptions))

// GraphQL and GraphiQL endpoints.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// DEV_ONLY
// Start listening to port...
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`API Server is now running on http://localhost:${PORT}`))
