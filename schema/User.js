const { comments } = require('./mock-data')

exports.schema = `
  type User {
    id: Int!
    email: String
    first_name: String
    last_name: String
    comments: [Comment]
  }
`

exports.resolvers = {
  User: {
    comments(user) {
      return comments.filter(c => c.user_id === user.id)
    },
  },
}
