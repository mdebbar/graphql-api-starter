const { users, comments } = require('./mock-data')

exports.schema = `
  type Query {
    users: [User]
    comments: [Comment]
    commentsByUser(user_id: Int): [Comment]
  }
`

exports.resolvers = {
  Query: {
    users() {
      return users
    },
    comments() {
      return comments
    },
    commentsByUser(_, { user_id }) {
      return comments.filter(c => c.user_id === user_id)
    },
  },
}
