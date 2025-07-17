import { FastifyInstance } from 'fastify';
import { CreateUserController } from './controller/CreateUserController';
import { LoginUserController } from './controller/LoginUserController';

function routes(fastify: FastifyInstance) {
  fastify.post('/create-account', async (request, reply) => {
    return new CreateUserController().handle(request, reply);
  });

  fastify.post('/login', async (request, reply) => {
    return new LoginUserController().handle(request, reply);
  });

  // fastify.get('user', async (request, reply) => {
  //   return
  // })
}

export default routes;
