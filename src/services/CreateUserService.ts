import { hashSync } from 'bcrypt-ts';
import db from '../lib/prisma';
import jwt from 'jsonwebtoken';

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
      message: 'registrado com sucesso',
    };
  }
}

export { CreateUserService };
