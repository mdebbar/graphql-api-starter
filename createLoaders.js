const DL = require('dataloader')
const data = require('./mock-data')

module.exports = function createLoaders() {
  return {
    user: new DL((keys) =>
      Promise.resolve(keys.map((k) => data.users.find(u => u.id === k)))
    ),

    allUsers: new DL(() => Promise.resolve([data.users])),

    comment: new DL((keys) =>
      Promise.resolve(keys.map((k) => data.comments.find(c => c.id === k)))
    ),

    video: new DL((keys) =>
      Promise.resolve(keys.map((k) => data.videos.find(v => v.id === k)))
    ),


    // `keys` are user IDs.
    userComments: new DL((keys) =>
      Promise.resolve(keys.map((k) => data.comments.filter(c => c.user_id === k)))
    ),

    // `keys` are user IDs.
    userVideos: new DL((keys) =>
      Promise.resolve(keys.map((k) => data.videos.filter(v => v.owner_id === k)))
    ),

    // `keys` are video IDs.
    videoComments: new DL((keys) =>
      Promise.resolve(keys.map((k) => data.comments.filter(c => c.video_id === k)))
    ),
  }
}
