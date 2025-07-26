import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserController } from './controller/auth/CreateUserController.js';
import { LoginUserController } from './controller/auth/LoginUserController.js';
import { GetUsersController } from './controller/auth/GetUsersController.js';
import { authenticateToken } from './middlewares/authenticateToken.js';
import { CreateRegisterMomentController } from './controller/moment/AddRegisterMomentController.js';
import { getAllRegisterController } from './controller/moment/getAllRegisterController.js';
import { SearchMomentsController } from './controller/moment/SearchMomentsController.js';
import { EditMomentController } from './controller/moment/EditMomentController.js';
import { GeminiController } from './controller/ia/GeminiController.js';
import { UpdatePhotoController } from './controller/moment/UpdatePhotoController.js';
import { upload } from './config/multer.js';
import { DeleteMomentsController } from './controller/moment/DeleteMoments.js';
import { RemoveMomentController } from './controller/moment/RemoveMoments.js';
import { UpdateFavoriteController } from './controller/moment/updateFavoriteController.js';
import { FilterRegisterController } from './controller/moment/FilterRegisterController.js';

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
  fastify.delete(
    '/delete-moment/:id',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new RemoveMomentController().handle(request, reply);
    },
  );
  fastify.put(
    '/isfavorite/:id',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new UpdateFavoriteController().handle(request, reply);
    },
  );

  fastify.get(
    '/get-allmoments/filter',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new FilterRegisterController().handle(request, reply);
    },
  );
}

export default routes;
