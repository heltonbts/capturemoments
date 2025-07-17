import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import routes from './routes';
import jwt from 'jsonwebtoken';
import db from './lib/prisma';

const app = fastify({ logger: true });

app.register(routes);

async function authenticateToken(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return reply
      .status(400)
      .send({ error: true, message: 'token not provided' });
  }

  try {
    const decoded = (await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
    )) as {
      userId: string;
    };
    request.user = { db, userId: decoded.userId };
  } catch (error: any) {
    return reply.status(400).send({
      error: true,
      message: error.message,
    });
  }
}

app.get(
  '/get-user',
  { preHandler: authenticateToken },
  async (request: FastifyRequest, reply: FastifyReply) => {
    const { user } = request;

    if (!user) {
      return reply.status(400).send({
        message: 'Usuário não encontrado',
      });
    }

    const isUser = await db.user.findFirst({
      where: {
        id: user.userId,
      },
    });

    if (!isUser) {
      return reply.status(400).send({
        message: 'Usuário não encontrado',
      });
    }

    return reply.status(200).send({
      user: isUser,
      message: 'Usuário Encontrado',
    });
  },
);

export default app;
