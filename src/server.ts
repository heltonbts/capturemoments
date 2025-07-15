import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import db from './lib/prisma';

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
    },
  );

  app.listen({ port: 1311 }, () => {
    console.log('Server is UP!');
  });
};

start();
