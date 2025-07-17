import { compare } from 'bcrypt-ts';
import db from '../lib/prisma';
import jwt from 'jsonwebtoken';

interface LoginUserRequest {
  email: string;
  password: string;
}

class LoginUserService {
  async execute({ email, password }: LoginUserRequest) {
    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Senha incorreta');
    }

    const acessToken = await jwt.sign(
      { userId: user.id },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: '72h',
      },
    );

    return {
      error: false,
      user: {
        fullName: user.fullName,
        email: user.email,
      },
      acessToken,
      message: 'Login realizado com sucesso',
    };
  }
}

export { LoginUserService };
