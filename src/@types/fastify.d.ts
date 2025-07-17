import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      db: any;
      userId: string;
    };
  }
}
