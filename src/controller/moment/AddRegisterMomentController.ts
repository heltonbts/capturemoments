import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterRequest } from '../../@types/RegisterRequest.js';
import { CreateRegisterMomentService } from '../../services/moment/CreateRegisterMomentsService.js';

class CreateRegisterMomentController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { title, story, visitedLocation, imageUrl, visitedDate } =
      request.body as RegisterRequest;

    const { user } = request;

    if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
      return reply.status(400).send({
        error: true,
        message: 'Todos os campos são obrigatórios',
      });
    }

    if (!user) {
      return reply.status(400).send({
        error: true,
        message: 'Usuário não autenticado',
      });
    }

    try {
      const createRegisterMoment = new CreateRegisterMomentService();

      const result = await createRegisterMoment.execute({
        title,
        story,
        visitedLocation,
        imageUrl,
        visitedDate,
        user,
      });

      return reply.status(200).send({
        result,
        message: 'registro adicionado com sucesso',
      });
    } catch (error: any) {
      return reply.status(400).send({
        error: false,
        message: error.message,
      });
    }
  }
}

export { CreateRegisterMomentController };
