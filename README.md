## Prerequisites

- node: at least version 5
- npm: version 3

## Setup

This is a simple nodejs/npm project and the setup is straight forward. All you need to do is run `npm install` and you are ready to go.

## Start the server

The default mode is "development":

    $ npm start

To start the server in production mode:

    $ npm run prod

## Express

We use express for the HTTP server along with some middleware for authentication, etc. The express layer is very thin since most of the API is implemented in the GraphQL layer.

## GraphQL

We use the innovative GraphQL technology to build our API. There are multiple libraries that provide GraphQL capabilities, but we settled with Facebook's reference implementation `graphql-js`.

### Exploring the GraphQL API

The cool thing about GraphQL is it comes with an API explorer for free. It's called `graphiql`. Once you start the server, you can simply visit `http://localhost:4000/graphiql`.

### Schema

The whole GraphQL schema is defined inside `schema/`. Every file represents one specific type e.g. `UserType`.

### Node Interface

The Node Interface gives each object a global id and allows us to fetch any object given that global id:

```graphql
{
  node(id:"TheGlobalID") {
    ... on UserType {
      firstName
    }
    ... on VideoType {
      name
    }
  }
}
```

Types need to explicitly support the Node Interface by providing 2 things:

1. Function that checks if an arbitrary object belongs to this type.
2. Function that fetches an object of this type given an id.

```javascript
const { registerAsNode } = require('./NodeInterface')

const UserType = new GraphQLObjectType({ ... })

function isUser(obj) { ... }
function fetchUserById(id) { ... }

registerAsNode(UserType, {
  isTypeOf: (obj) => isUser(obj),
  resolveId: (id) => fetchUserById(id),
})
```
