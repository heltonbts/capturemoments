import db from '../../lib/prisma.js';

interface UpdateProps {
  user: {
    userId: string;
  };
  id: string;
  isFavorite: boolean;
}

class UpdateFavoriteSerice {
  async execute({ user, id, isFavorite }: UpdateProps) {
    const ExistMoment = await db.moments.findFirst({
      where: {
        userId: user.userId,
        id,
      },
    });

    if (!ExistMoment) {
      throw new Error('O momento não existe');
    }

    const update = await db.moments.updateMany({
      where: {
        id,
        userId: user.userId,
      },
      data: {
        isFavorite,
      },
    });

    return {
      message: 'Momento atualizado com sucesso',
      update,
    };
  }
}

export { UpdateFavoriteSerice };
