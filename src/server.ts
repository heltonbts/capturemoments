import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import routes from './routes';

const app = fastify({
  logger: true,
});

const start = async () => {
  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({
      message: 'Hello, World!',
    });
  });

  app.register(routes);

  app.listen({ port: 1311 }, () => {
    console.log('Server is UP!');
  });
};

start();
