const { registerAsNode } = require('./NodeInterface')
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLFloat,
} = require('graphql')


const fields = () => ({
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

const VideoType = new GraphQLObjectType({
  name: 'Video',
  description: 'An uploaded video',
  fields,
})

registerAsNode(VideoType, {
  isTypeOf: (obj) => obj.hasOwnProperty('owner_id'),
  resolveId: (id, { loaders }) => loaders.video.load(id),
})


module.exports = VideoType
