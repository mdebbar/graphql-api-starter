const { registerAsNode } = require('./NodeInterface')
const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')


const fields = () => ({
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

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'A comment on a video',
  fields,
})

registerAsNode(CommentType, {
  isTypeOf: (obj) => obj.hasOwnProperty('text'),
  resolveId: (id, { loaders }) => loaders.comment.load(id),
})


module.exports = CommentType
