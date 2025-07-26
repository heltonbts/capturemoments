import { FastifyReply, FastifyRequest } from 'fastify';
import { RemoveMomentService } from '../../services/moment/RemoveMomentService.js';

class RemoveMomentController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { user } = request;

    if (!user) {
      return reply.status(401).send({
        message: 'Usuário não encontrado',
      });
    }

    if (!id) {
      return reply.status(400).send({
        message: 'id não fornecido',
      });
    }

    try {
      const removeMoment = new RemoveMomentService();
      const result = removeMoment.execute({
        id,
        user,
      });

      return reply.send({
        result,
        message: 'Momento Apagado Com Sucesso',
      });
    } catch (error: any) {
      reply.send({ error: error.message });
    }
  }
}

export { RemoveMomentController };
