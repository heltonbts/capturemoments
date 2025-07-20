import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import routes from './routes';
import { fastifyMultipart } from '@fastify/multipart';
import { authenticateToken } from './middlewares/authenticateToken';
import db from './lib/prisma';
import path from 'path';
import fs from 'fs';

const app = fastify({ logger: true });

app.register(fastifyMultipart);
app.register(routes);

app.delete(
  '/delete-moment/:id',
  { preHandler: authenticateToken },
  async (request: FastifyRequest, reply: FastifyReply) => {
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

    const registerMoment = await db.moments.findFirst({
      where: {
        userId: user.userId,
      },
    });

    if (!registerMoment) {
      return reply.status(400).send({
        message: 'registro de momento não encontrado',
      });
    }

    await db.moments.delete({
      where: {
        id,
        userId: user.userId,
      },
    });

    const imageUrl = registerMoment.imageUrl;

    const fileName = path.basename(imageUrl);

    const filePath = path.join(process.cwd(), 'uploads', fileName);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log('Falha ao deletar momento', err);
      }
    });

    return reply
      .status(200)
      .send({ message: 'Momento Deletado com Sucesso! ' });
  },
);

export default app;
