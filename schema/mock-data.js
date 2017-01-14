module.exports = {
  users: [{
    id: 100,
    name: 'Mouad',
    email: 'm@m.m',
  }, {
    id: 101,
    name: 'Kiran',
    email: 'k@k.k',
  }, {
    id: 102,
    name: 'John',
    email: 'j@j.j',
  }],

  comments: [{
    id: 200,
    userId: 102,
    text: 'Negative comment text..',
  }, {
    id: 201,
    userId: 101,
    text: 'Positive comment here :)',
  }, {
    id: 202,
    userId: 102,
    text: 'Yet another negative comment :(',
  }],
}
