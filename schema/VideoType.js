const data = require('./mock-data')
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
    resolve: (video) => data.users.find(u => u.id === video.owner_id),
  },
  comments: {
    type: new GraphQLList(require('./CommentType')),
    resolve: (video) => data.comments.filter(c => c.video_id === video.id),
  },
})

module.exports = new GraphQLObjectType({
  name: 'Video',
  description: 'An uploaded video',
  fields,
})
