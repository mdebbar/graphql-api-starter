const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const schema = require('./schema')

const PORT = 4000

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

app.listen(PORT)
