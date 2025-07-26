import { FastifyReply, FastifyRequest } from 'fastify';
import { UpdateFavoriteSerice } from '../../services/moment/UpdateFavoriteService.js';

class UpdateFavoriteController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    const { isFavorite } = request.body as { isFavorite: boolean };
    const { user } = request;

    if (!user) {
      return reply.status(401).send({ message: 'Usuário não autenticado' });
    }

    if (!id) {
      return reply.status(400).send({ message: 'Momento não encontrado' });
    }

    try {
      const updateFavorite = new UpdateFavoriteSerice();

      const result = await updateFavorite.execute({
        id,
        isFavorite,
        user,
      });

      return reply.status(200).send(result);
    } catch (error) {
      console.error(error);
      return reply
        .status(500)
        .send({ message: 'Erro ao atualizar o favorito' });
    }
  }
}

export { UpdateFavoriteController };
