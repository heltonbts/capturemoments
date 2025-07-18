import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import routes from './routes';
import db from './lib/prisma';
import { authenticateToken } from './middlewares/authenticateToken';

const app = fastify({ logger: true });

app.register(routes);

interface RegisterRequest {
  title: string;
  story: string;
  visitedLocation: string[];
  imageUrl: string;
  visitedDate: string;
}

app.post(
  '/add-register',
  { preHandler: authenticateToken },
  async (request: FastifyRequest, reply: FastifyReply) => {
    const { user } = request;
    const { title, story, visitedLocation, imageUrl, visitedDate } =
      request.body as RegisterRequest;

    console.log('User', user);
    console.log('Request body', request);

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

    const parsedVisitedDate = new Date(parseInt(visitedDate));

    const registedMoment = await db.moments.create({
      data: {
        title,
        story,
        visitedDate: parsedVisitedDate,
        visitedLocation,
        imageUrl,
        userId: user.userId,
      },
    });

    reply.status(200).send({ registedMoment, message: 'Registro Adcionado' });
  },
);

export default app;
