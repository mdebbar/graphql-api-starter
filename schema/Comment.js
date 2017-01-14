const { users } = require('./mock-data')

exports.schema = `
  type Comment {
    id: Int!
    text: String
    user: User
  }
`

exports.resolvers = {
  Comment: {
    user(comment) {
      return users.find(a => a.id === comment.userId)
    },
  },
}
