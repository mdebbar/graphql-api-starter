const { comments } = require('./mock-data')

exports.schema = `
  type User {
    id: Int!
    email: String
    name: String
    comments: [Comment]
  }
`

exports.resolvers = {
  User: {
    comments(user) {
      return comments.filter(c => c.userId === user.id)
    },
  },
}
