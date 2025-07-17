import { FastifyInstance } from 'fastify';
import { CreateUserController } from './controller/CreateUserController';

function routes(fastify: FastifyInstance) {
  fastify.post('/create-account', async (request, reply) => {
    return new CreateUserController().handle(request, reply);
  });
}

export default routes;
