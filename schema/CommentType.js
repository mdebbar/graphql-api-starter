const data = require('./mock-data')
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
    resolve: (comment) => data.users.find(u => u.id === comment.user_id),
  },
  video: {
    type: require('./VideoType'),
    resolve: (comment) => data.videos.find(v => v.id === comment.video_id),
  },
})

module.exports = new GraphQLObjectType({
  name: 'Comment',
  description: 'A comment on a video',
  fields,
})
