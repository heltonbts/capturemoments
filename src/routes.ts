import { FastifyInstance } from 'fastify';
import { CreateUserController } from './controller/auth/CreateUserController';
import { LoginUserController } from './controller/auth/LoginUserController';
import { GetUsersController } from './controller/auth/GetUsersController';
import { authenticateToken } from './services/auth/GetUsersService';

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
