import fastify from 'fastify';

const app = fastify({
  logger: true,
});

const start = async () => {
  app.get('/', async (request, reply) => {
    reply.send({
      message: 'Hello, World!',
    });
  });
  app.listen({ port: 1311 }, () => {
    console.log('Server is UP!');
  });
};

start();
