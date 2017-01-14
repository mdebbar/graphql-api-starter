const { makeExecutableSchema } = require('graphql-tools')

const { schema: querySchema, resolvers: queryResolvers } = require('./Query')
const { schema: userSchema, resolvers: userResolvers } = require('./User')
const { schema: commentSchema, resolvers: commentResolvers } = require('./Comment')

const rootSchema = `
  schema {
    query: Query
  }
`

module.exports = makeExecutableSchema({
  typeDefs: [
    rootSchema,
    querySchema,
    userSchema,
    commentSchema,
  ],
  resolvers: Object.assign({},
    queryResolvers,
    userResolvers,
    commentResolvers
  ),
})
