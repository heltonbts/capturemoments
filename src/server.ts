import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import db from './lib/prisma';
import { compare } from 'bcrypt-ts';
import jwt from 'jsonwebtoken';
import routes from './routes';

const app = fastify({
  logger: true,
});

const start = async () => {
  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({
      message: 'Hello, World!',
    });
  });

  app.register(routes);

  app.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      reply.status(400).send({
        message: 'Todos os campos são obrigatórios',
      });
    }

    const isUser = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!isUser) {
      return reply.status(400).send({
        error: true,
        message: 'Usuário não encontrado, por favor, crie uma conta primeiro',
      });
    }

    const isPasswordValid = await compare(password, isUser.password);
    if (!isPasswordValid) {
      return reply.status(400).send({
        error: true,
        message: 'Senha incorreta. ',
      });
    }

    const acessToken = await jwt.sign(
      { userId: isUser.id },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: '72h',
      },
    );

    return reply.status(200).send({
      error: false,
      user: {
        fullName: isUser.fullName,
        email: isUser.email,
      },
      acessToken,
      message: 'Login realizado com sucesso',
    });
  });

  app.listen({ port: 1311 }, () => {
    console.log('Server is UP!');
  });
};

start();
