import db from '../../lib/prisma';
import path from 'path';
import fs from 'fs';

interface RemoveMomentProps {
  user: {
    userId: string;
  };
  id: string;
}

class RemoveMomentService {
  async execute({ user, id }: RemoveMomentProps) {
    const registerMoment = await db.moments.findFirst({
      where: {
        id,
        userId: user.userId,
      },
    });

    if (!registerMoment) {
      return {
        message: 'registro de momento não encontrado',
      };
    }

    await db.moments.deleteMany({
      where: {
        id,
      },
    });

    const imageUrl = registerMoment.imageUrl;

    const fileName = path.basename(imageUrl);

    const filePath = path.join(process.cwd(), 'uploads', fileName);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.log('Falha ao deletar momento', err);
      }
    });

    return { message: 'Momento deletado com sucesso', path: filePath };
  }
}

export { RemoveMomentService };
