import { compare } from 'bcrypt-ts';
import db from '../../lib/prisma.js';
import { AuthUtils } from '../../utils/authutils.js';

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

    const accessToken = AuthUtils.generateAccessToken(user.id);

    return {
      error: false,
      user: {
        fullName: user.fullName,
        email: user.email,
      },
      accessToken,
      message: 'Login realizado com sucesso',
    };
  }
}

export { LoginUserService };
