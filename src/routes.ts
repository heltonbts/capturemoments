import { FastifyInstance } from 'fastify';
import { CreateUserController } from './controller/CreateUserController';
import { LoginUserController } from './controller/LoginUserController';
import { authenticateToken } from './services/GetUsersService';
import { GetUsersController } from './controller/GetUsersController';

function routes(fastify: FastifyInstance) {
  fastify.post('/create-account', async (request, reply) => {
    return new CreateUserController().handle(request, reply);
  });

  fastify.post('/login', async (request, reply) => {
    return new LoginUserController().handle(request, reply);
  });

  fastify.get(
    '/get-user',
    { preHandler: authenticateToken },
    async (request, reply) => {
      return new GetUsersController().handle(request, reply);
    },
  );
}

export default routes;
