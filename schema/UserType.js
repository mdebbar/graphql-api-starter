const data = require('./mock-data')
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
    resolve: (user) => data.comments.filter(c => c.user_id === user.id),
  },
  videos: {
    type: new GraphQLList(require('./VideoType')),
    resolve: (user) => data.videos.filter(v => v.owner_id === user.id),
  },
})

module.exports = new GraphQLObjectType({
  name: 'User',
  description: 'A user of the system',
  fields,
})
