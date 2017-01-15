const { users } = require('./mock-data')

exports.schema = `
  type Video {
    id: Int!
    name: String
    owner: User!
    # series: Series
    created: Float!
    updated: Float!
  }
`

exports.resolvers = {
  Video: {
    owner(video) {
      return users.find(u => u.id === video.owner_id)
    },
  },
}
