import { hashSync } from 'bcrypt-ts';
import db from '../../lib/prisma.js';
import { AuthUtils } from '../../utils/authutils.js';

interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ fullName, email, password }: CreateUserRequest) {
    const isUser = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (isUser) {
      throw new Error('Usuário já exite');
    }

    const hashedPassword = hashSync(password, 10);

    const user = await db.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    const accessToken = AuthUtils.generateAccessToken(user.id);

    return {
      error: false,
      user: {
        fullName: user.fullName,
        email: user.email,
      },
      accessToken,
      message: 'registrado com sucesso',
    };
  }
}

export { CreateUserService };
