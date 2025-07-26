import { FastifyReply, FastifyRequest } from 'fastify';
import { SearchMomentsService } from '../../services/moment/SearchMomentsService.js';

class SearchMomentsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { user } = request;
    const { query } = request.query as { query: string };

    if (!query) {
      return reply.status(400).send({
        message: 'Query parameter is required',
        error: true,
      });
    }

    if (!user) {
      return reply.status(400).send({
        message: 'User not authenticate',
        error: true,
      });
    }
    try {
      const searchMoments = new SearchMomentsService();

      const result = await searchMoments.execute({ user, query });

      return reply.status(200).send({
        message: result,
      });
    } catch (error: any) {
      return reply
        .send({
          message: error.mensage,
        })
        .status(400);
    }
  }
}

export { SearchMomentsController };
