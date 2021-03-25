require('dotenv').config()

console.info('Loaded env:', JSON.stringify(process.env, null, 2))

const fastify = require('fastify')({
  logger: !!process.env.DEV
})

const PORT = process.env.PORT || 3001

// Plugins
fastify.register(require('./plugins/mongo'))

// Routes
fastify.register(require('./routes/document'), { prefix: '/document' })

fastify.listen(PORT, function(err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }

  fastify.log.info(`document-module listening on ${address}`)
})
