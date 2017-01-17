const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} = require('graphql')


const fields = () => ({
  id: { type: GraphQLInt },
  name: { type: GraphQLString },
  uploaded: { type: GraphQLFloat },
  owner: {
    type: require('./UserType'),
    resolve: (video, args, { loaders }) =>
      loaders.user.load(video.owner_id),
  },
  comments: {
    type: new GraphQLList(require('./CommentType')),
    resolve: (video, args, { loaders }) =>
      loaders.videoComments.load(video.id),
  },
})

module.exports = new GraphQLObjectType({
  name: 'Video',
  description: 'An uploaded video',
  fields,
})
