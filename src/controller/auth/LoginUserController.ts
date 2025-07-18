import { FastifyReply, FastifyRequest } from 'fastify';
import { LoginUserService } from '../../services/auth/LoginUserService';

class LoginUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      reply.status(400).send({
        message: 'Todos os campos são obrigatórios',
      });
    }

    try {
      const loginUserService = new LoginUserService();

      const user = await loginUserService.execute({
        email,
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

export { LoginUserController };
