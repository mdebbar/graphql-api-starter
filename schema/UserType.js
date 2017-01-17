const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
} = require('graphql')


const fields = () => ({
  id: { type: GraphQLInt },
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

module.exports = new GraphQLObjectType({
  name: 'User',
  description: 'A user of the system',
  fields,
})
