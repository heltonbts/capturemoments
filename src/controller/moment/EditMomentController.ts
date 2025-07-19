import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterRequest } from '../../@types/RegisterRequest';
import { EditMomentService } from '../../services/moment/EditMomentService';

class EditMomentController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { user } = request;
    const { title, story, visitedLocation, imageUrl, visitedDate } =
      request.body as RegisterRequest;

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
      const editMomentService = new EditMomentService();
      const result = await editMomentService.execute({
        id,
        imageUrl,
        story,
        title,
        user,
        visitedDate,
        visitedLocation,
      });

      return reply.send({ result }).status(200);
    } catch (error: any) {
      return reply.status(400).send({
        error: true,
        message: error.message,
      });
    }
  }
}

export { EditMomentController };
