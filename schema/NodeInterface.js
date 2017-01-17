const assert = require('assert')
const {
  fromGlobalId,
  globalIdField,
  nodeDefinitions,
} = require('graphql-relay')


const idResolvers = {}

function globalIdResolver(globalId, context) {
  const { id, type } = fromGlobalId(globalId)
  const resolver = idResolvers[type]
  if (typeof resolver === 'function') {
    return resolver(id, context)
  }
}

const { nodeField, nodeInterface } = nodeDefinitions(globalIdResolver)

function registerAsNode(type, config) {
  // Do some checks
  assert(typeof config.isTypeOf === 'function', 'The `isTypeOf` function is required')
  assert(typeof config.resolveId === 'function', 'The `resolveId` function is required')
  // Add the `Node` interface.
  type._typeConfig.interfaces = type._typeConfig.interfaces || []
  type._typeConfig.interfaces.push(nodeInterface)
  // Set `isTypeOf`
  type.isTypeOf = config.isTypeOf
  // Add the `id` field
  const newIdField = globalIdField(type.name)
  const originalFields = type._typeConfig.fields
  if (typeof originalFields === 'function') {
    type._typeConfig.fields = (...args) =>
      Object.assign({}, originalFields(...args), { id: newIdField })
  } else if (originalFields) {
    originalFields.id = newIdField
  }
  // Store the id resolver of this type
  idResolvers[type.name] = config.resolveId
}

module.exports = {
  nodeField,
  registerAsNode,
}
