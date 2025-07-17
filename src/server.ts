import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import db from './lib/prisma';
import { hashSync } from 'bcrypt-ts';
import jwt from 'jsonwebtoken';

const app = fastify({
  logger: true,
});

const start = async () => {
  app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.status(200).send({
      message: 'Hello, World!',
    });
  });

  app.post(
    '/create-account',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { fullName, email, password } = request.body as {
        fullName: string;
        email: string;
        password: string;
      };

      if (!fullName || !email || !password) {
        reply.status(400).send({
          message: 'Todos os campos são obrigatórios',
        });
      }

      const isUser = await db.user.findFirst({
        where: {
          email: email,
        },
      });

      if (isUser) {
        reply.status(400).send({
          error: true,
          message: 'Usuário já cadastrado',
        });
      }

      const hashedPassword = hashSync(password, 10);

      const user = await db.user.create({
        data: {
          fullName,
          email,
          password: hashedPassword,
        },
      });

      const acessToken = await jwt.sign(
        { userId: user.id },
        process.env.ACCESS_TOKEN_SECRET!,
        {
          expiresIn: '72h',
        },
      );

      reply.status(200).send({
        error: false,
        user: {
          fullName: user.fullName,
          email: user.email,
        },
        acessToken,
        message: 'registrado com sucesso',
      });
    },
  );

  app.listen({ port: 1311 }, () => {
    console.log('Server is UP!');
  });
};

start();
