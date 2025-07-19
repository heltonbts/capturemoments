import db from '../../lib/prisma';

interface SearchRequest {
  query: string;
  user: {
    userId: string;
  };
}

class SearchMomentsService {
  async execute({ user, query }: SearchRequest) {
    const searchResults = await db.moments.findMany({
      where: {
        userId: user.userId,
        OR: [
          {
            title: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            story: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            visitedLocation: {
              hasSome: [query],
            },
          },
        ],
      },
      orderBy: {
        isFavorite: 'desc',
      },
    });

    return searchResults;
  }
}

export { SearchMomentsService };
