import { FastifyReply, FastifyRequest } from 'fastify';

class UpdatePhotoController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const file = (request as any).file;

    if (!file.filename) {
      reply.status(400).send({
        message: 'no file uploaded',
      });
    }

    try {
      const imageUrl = `http://localhost:1311/uploads/${file.filename}`;

      return await imageUrl;
    } catch (error: any) {
      reply.send({ error: error.mensage });
    }
  }
}

export { UpdatePhotoController };
