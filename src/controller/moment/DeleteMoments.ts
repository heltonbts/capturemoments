import { FastifyRequest, FastifyReply } from 'fastify';
import path from 'path';
import fs from 'fs';

class DeleteMomentsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { imageUrl } = request.query as { imageUrl: string };

    if (!imageUrl) {
      return reply.status(400).send({
        message: 'params is required',
      });
    }

    const fileName = path.basename(imageUrl);

    const filePath = path.join(process.cwd(), 'uploads', fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return { message: 'Imagem deletada com sucesso' };
    } else {
      throw new Error('imagem não encontrada');
    }
  }
}

export { DeleteMomentsController };
