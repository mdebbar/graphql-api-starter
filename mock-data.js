module.exports = {
  users: [{
    id: '100',
    first_name: 'Mouad',
    last_name: 'Debbar',
    email: 'm@m.m',
  }, {
    id: '101',
    first_name: 'Kiran',
    last_name: 'Yellanki',
    email: 'k@k.k',
  }, {
    id: '102',
    first_name: 'John',
    last_name: 'Smith',
    email: 'j@j.j',
  }],

  comments: [{
    id: '200',
    user_id: '102',
    video_id: '301',
    text: 'Negative comment text..',
  }, {
    id: '201',
    user_id: '101',
    video_id: '301',
    text: 'Positive comment here :)',
  }, {
    id: '202',
    user_id: '102',
    video_id: '300',
    text: 'Yet another negative comment :(',
  }],

  videos: [{
    id: '300',
    owner_id: '101',
    name: 'Random Video',
  }, {
    id: '301',
    owner_id: '102',
    name: 'Another Random Video',
  }],
}
