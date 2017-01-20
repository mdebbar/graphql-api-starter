const { nodeField } = require('./NodeInterface')
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} = require('graphql')


const fields = () => ({
  node: nodeField,
  users: {
    type: new GraphQLList(require('./UserType')),
    resolve: (root, args, { loaders }) =>
      loaders.allUsers.load('__all__'),
  },
  me: {
    type: require('./UserType'),
    resolve: (root, args, { user }) => user,
  },
  getUser: {
    type: require('./UserType'),
    args: {
      id: { type: GraphQLString },
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
