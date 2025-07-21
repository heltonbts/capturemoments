import { FastifyReply, FastifyRequest } from 'fastify';
import db from '../../lib/prisma';

class FilterRegisterController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { startDate, endDate } = request.query as {
      startDate: string;
      endDate: string;
    };
    const { user } = request;

    if (!user) {
      return reply.status(400).send({ message: 'usuário não autenticado' });
    }
    const start = new Date(parseInt(startDate));
    const end = new Date(parseInt(endDate));

    return await db.moments.findMany({
      where: {
        userId: user.userId,
        visitedDate: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        isFavorite: 'desc',
      },
    });
  }
}

export { FilterRegisterController };
