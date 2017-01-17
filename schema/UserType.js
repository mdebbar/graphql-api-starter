const { registerAsNode } = require('./NodeInterface')
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
} = require('graphql')


const fields = () => ({
  email: { type: GraphQLString },
  firstName: {
    type: GraphQLString,
    resolve: (user) => user.first_name,
  },
  lastName: {
    type: GraphQLString,
    resolve: (user) => user.last_name,
  },
  comments: {
    type: new GraphQLList(require('./CommentType')),
    resolve: (user, args, { loaders }) =>
      loaders.userComments.load(user.id),
  },
  videos: {
    type: new GraphQLList(require('./VideoType')),
    resolve: (user, args, { loaders }) =>
      loaders.userVideos.load(user.id),
  },
})

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user of the system',
  fields,
})

registerAsNode(UserType, {
  isTypeOf: (obj) => obj.hasOwnProperty('email'),
  resolveId: (id, { loaders }) => loaders.user.load(id),
})


module.exports = UserType
