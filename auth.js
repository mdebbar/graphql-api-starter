const jwt = require('express-jwt')

// TODO: Maybe don't force authentication in dev mode?
//       In that case, we need a way to identify "current user".
//       What about a `CURRENT_USER=user@email.com` env variable?

// TODO: If, at some point, we decide to allow anonymous users, we could pass
//       { credentialsRequired: false } below, and inject a dummy user object
//       with no videos, etc.

const authenticate = jwt({
  secret: process.env.AUTH0_SECRET,
  requestProperty: 'auth',
})

function injectUser(req, res, next) {
  // TODO: we should do User.getOrCreate(...) here.
  req.user = {
    id: req.auth.sub,
    email: req.auth.email,
    first_name: req.auth.given_name,
    last_name: req.auth.family_name,
  }
  next()
}

module.exports = { authenticate, injectUser }
