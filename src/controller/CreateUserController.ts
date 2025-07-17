import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
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

    try {
      const createUserService = new CreateUserService();

      const user = await createUserService.execute({
        email,
        fullName,
        password,
      });
      reply.send(user);
    } catch (error: any) {
      return reply.status(400).send({
        error: true,
        message: error.message,
      });
    }
  }
}

export { CreateUserController };
