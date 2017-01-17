const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const createLoaders = require('./createLoaders')
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

console.log('----- Full Schema -----\n')
console.log(require('graphql').printSchema(schema))
console.log('----- End Schema -----\n')

// Setup GraphQL endpoint.
const graphqlEndpoint = graphqlHTTP(() => ({
  schema,
  context: { loaders: createLoaders() },
  // DEV_ONLY ?
  graphiql: true,
  // DEV_ONLY
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack,
  }),
}))
app.use('/graphql', graphqlEndpoint)

// DEV_ONLY
// Start listening to port...
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`API Server is now running on http://localhost:${PORT}`))
