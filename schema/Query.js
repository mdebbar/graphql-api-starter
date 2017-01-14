const { users, comments } = require('./mock-data')

exports.schema = `
  type Query {
    users: [User]
    comments: [Comment]
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
  },
}
