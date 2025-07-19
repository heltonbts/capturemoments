import db from '../../lib/prisma';

interface EditMomentProps {
  id: string;
  user: {
    userId: string;
  };
  title: string;
  story: string;
  visitedDate: string;
  visitedLocation: string[];
  imageUrl: string;
}

class EditMomentService {
  async execute({
    id,
    user,
    title,
    story,
    visitedDate,
    visitedLocation,
    imageUrl,
  }: EditMomentProps) {
    const parsedVisitedDate = new Date(parseInt(visitedDate));

    const registeredMoment = await db.moments.findFirst({
      where: {
        id,
        userId: user.userId,
      },
    });

    if (!registeredMoment) {
      throw new Error('Register Moment not found');
    }

    const updateRegistered = await db.moments.update({
      where: {
        id,
      },
      data: {
        title,
        story,
        visitedDate: parsedVisitedDate,
        visitedLocation,
        imageUrl: imageUrl,
      },
    });

    return updateRegistered;
  }
}

export { EditMomentService };
