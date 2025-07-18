import db from '../../lib/prisma';

interface UserRequest {
  userId: string;
}

class GetUserService {
  async execute(user: UserRequest) {
    const isUser = await db.user.findFirst({
      where: {
        id: user.userId,
      },
    });

    if (!isUser) {
      throw new Error('Usuário não encontrado');
    }

    return {
      user: isUser,
      message: 'Usuário Encontrado',
    };
  }
}

export { GetUserService };
