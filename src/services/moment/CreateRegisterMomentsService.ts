import { RegisterRequest } from '../../@types/RegisterRequest.js';
import db from '../../lib/prisma.js';

class CreateRegisterMomentService {
  async execute({
    title,
    story,
    visitedDate,
    visitedLocation,
    imageUrl,
    user,
  }: RegisterRequest) {
    const parsedVisitedDate = new Date(parseInt(visitedDate));

    const registedMoment = await db.moments.create({
      data: {
        title,
        story,
        visitedDate: parsedVisitedDate,
        visitedLocation,
        imageUrl,
        userId: user.userId,
      },
    });

    return registedMoment;
  }
}

export { CreateRegisterMomentService };
