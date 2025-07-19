import { FastifyReply, FastifyRequest } from 'fastify';
import { GetAllRegisterService } from '../../services/moment/getAllRegisterService';

class getAllRegisterController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { user } = request;

    if (!user) {
      throw new Error('Usuário não existe');
    }

    try {
      const getAllRegister = await new GetAllRegisterService().execute({
        userId: user.userId,
      });

      return reply
        .send({
          moments: getAllRegister,
          message: 'registro obtidos com sucesso',
        })
        .status(200);
    } catch (error: any) {
      return reply.status(400).send({
        error: true,
        message: error.message,
      });
    }
  }
}

export { getAllRegisterController };
