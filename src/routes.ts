import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserController } from './controller/auth/CreateUserController';
import { LoginUserController } from './controller/auth/LoginUserController';
import { GetUsersController } from './controller/auth/GetUsersController';
import { authenticateToken } from './middlewares/authenticateToken';
import { CreateRegisterMomentController } from './controller/moment/AddRegisterMomentController';
import { getAllRegisterController } from './controller/moment/getAllRegisterController';
import { SearchMomentsController } from './controller/moment/SearchMomentsController';
import { EditMomentController } from './controller/moment/EditMomentController';
import { GeminiController } from './controller/ia/GeminiController';
import { UpdatePhotoController } from './controller/moment/UpdatePhotoController';
import { upload } from './config/multer';
import { DeleteMomentsController } from './controller/moment/DeleteMoments';

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

  fastify.put(
    '/edit-moments/:id',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new EditMomentController().handle(request, reply);
    },
  );

  fastify.post('/ia', async (request: FastifyRequest, reply: FastifyReply) => {
    return new GeminiController().handle(request, reply);
  });

  fastify.post(
    '/image-upload',
    { preHandler: upload.single('image') },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new UpdatePhotoController().handle(request, reply);
    },
  );
  fastify.delete(
    '/delete-photo',
    { preHandler: upload.single('image') },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteMomentsController().handle(request, reply);
    },
  );
}

export default routes;
