const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const { graphqlExpress, graphiqlExpress } = require('graphql-server-express')
const schema = require('./schema')

const PORT = 4000

var app = express()

app.use(morgan('dev'))

// FIXES CORS ERROR
var whitelist = [
    'http://localhost:3000',
]
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1
        callback(null, originIsWhitelisted)
    },
    credentials: true,
}
app.use(cors(corsOptions))

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(PORT)
