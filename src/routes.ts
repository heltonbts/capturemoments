import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserController } from './controller/auth/CreateUserController';
import { LoginUserController } from './controller/auth/LoginUserController';
import { GetUsersController } from './controller/auth/GetUsersController';
import { authenticateToken } from './middlewares/authenticateToken';
import { CreateRegisterMomentController } from './controller/AddRegisterMomentController';
import { getAllRegisterController } from './controller/getAllRegisterController';
import { SearchMomentsController } from './controller/auth/SearchMomentsController';

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

  fastify.post(
    '/add-register',
    { preHandler: authenticateToken },
    async (request, reply) => {
      return new CreateRegisterMomentController().handle(request, reply);
    },
  );

  fastify.get(
    '/get-allmoments',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new getAllRegisterController().handle(request, reply);
    },
  );

  fastify.get(
    '/search',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new SearchMomentsController().handle(request, reply);
    },
  );
}

export default routes;
