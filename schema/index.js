const { makeExecutableSchema } = require('graphql-tools')

const rootSchema = `
  type User {
    id: Int!
    email: String
    name: String
    comments: [Comment]
  }

  type Comment {
    id: Int!
    text: String
    author: User
  }

  type Query {
    comments: [Comment]
  }

  schema {
    query: Query
  }
`

const rootResolvers = {
  Query: {
    comments() {
      return comments
    },
  },
  Comment: {
    author(comment) {
      return authors.find(a => a.id === comment.authorId)
    },
  },
  User: {
    comments(user) {
      return comments.filter(c => c.authorId === user.id)
    },
  },
}

const authors = [{
  id: 100,
  name: 'Mouad',
  email: 'm@m.m',
}, {
  id: 101,
  name: 'Kiran',
  email: 'k@k.k',
}, {
  id: 102,
  name: 'Johnathan',
  email: 'j@j.j',
}]

const comments = [{
  id: 200,
  authorId: 102,
  text: 'Negative comment text..',
}, {
  id: 201,
  authorId: 101,
  text: 'Positive comment here :)',
}, {
  id: 202,
  authorId: 102,
  text: 'Yet another negative comment :(',
}]

const executableSchema = makeExecutableSchema({
  typeDefs: rootSchema,
  resolvers: rootResolvers,
})

module.exports = executableSchema
