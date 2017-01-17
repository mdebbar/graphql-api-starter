const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql')


const fields = () => ({
  id: { type: GraphQLInt },
  text: { type: GraphQLString },
  user: {
    type: require('./UserType'),
    resolve: (comment, args, { loaders }) =>
      loaders.user.load(comment.user_id),
  },
  video: {
    type: require('./VideoType'),
    resolve: (comment, args, { loaders }) =>
      loaders.video.load(comment.video_id),
  },
})

module.exports = new GraphQLObjectType({
  name: 'Comment',
  description: 'A comment on a video',
  fields,
})
