import db from '../../lib/prisma.js';

class GetAllRegisterService {
  async execute(user: { userId: string }) {
    const registeredMoments = await db.moments.findMany({
      where: {
        userId: user.userId,
      },

      orderBy: {
        isFavorite: 'desc',
      },
    });

    return registeredMoments;
  }
}

export { GetAllRegisterService };
