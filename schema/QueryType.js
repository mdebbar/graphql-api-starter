const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
} = require('graphql')


const fields = () => ({
  users: {
    type: new GraphQLList(require('./UserType')),
    resolve: (root, args, { loaders }) =>
      loaders.allUsers.load('__all__'),
  },
  getUser: {
    type: require('./UserType'),
    args: {
      id: { type: GraphQLInt },
    },
    resolve: (root, { id }, { loaders }) =>
      loaders.user.load(id),
  },
})

module.exports = new GraphQLObjectType({
  name: 'Query',
  description: 'The root Query type',
  fields,
})
