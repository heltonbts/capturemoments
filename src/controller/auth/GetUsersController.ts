import { FastifyReply, FastifyRequest } from 'fastify';
import { GetUserService } from '../../services/auth/GetUsersService.js';

class GetUsersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { user } = request;

    if (!user) {
      return reply.status(400).send({
        message: 'Usuário não encontrado',
      });
    }

    try {
      const getUsersController = new GetUserService();

      const response = await getUsersController.execute({
        userId: user.userId,
      });
      return reply.send(response);
    } catch (error: any) {
      return reply.status(400).send({
        error: true,
        message: error.message,
      });
    }
  }
}
export { GetUsersController };
