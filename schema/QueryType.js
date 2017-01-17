const data = require('./mock-data')
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
} = require('graphql')


const fields = () => ({
  users: {
    type: new GraphQLList(require('./UserType')),
    resolve: () => data.users,
  },
  getUser: {
    type: require('./UserType'),
    args: {
      id: { type: GraphQLInt },
    },
    resolve: (root, { id }) => {
      return data.users.find(u => u.id === id)
    },
  },
})

module.exports = new GraphQLObjectType({
  name: 'Query',
  description: 'The root Query type',
  fields,
})
