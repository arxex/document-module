async function routes(fastify, options) {
  const collection = fastify.mongo.db.collection('documents')

  fastify.get('/', async(request, reply) => {
    const { id } = request.query

    if (id) {
      const result = await collection.findOne({ id })
      if (result === null) {
        throw new Error('Invalid value')
      }
      return result
    } else {
      const result = await collection.find().toArray()
      if (result.length === 0) {
        throw new Error('No documents found')
      }
      return result
    }

    return { hello: 'world' + id }
  })

  fastify.post('/', async(request, reply) => {
    const { id } = request.body

    if (id) {
      // console.log('\nid', fastify.mongo.ObjectId(id))
      const result = await collection.updateOne({ _id: fastify.mongo.ObjectId(id) }, { $set: request.body })

      return result
    } else {
      const result = await collection.insert(request.body)

      return result
    }
  })
}

module.exports = routes
