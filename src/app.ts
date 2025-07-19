import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import routes from './routes';
import { fastifyMultipart } from '@fastify/multipart';
import path from 'path';
import fs from 'fs';

const app = fastify({ logger: true });

app.register(fastifyMultipart);
app.register(routes);

app.delete(
  '/delete-photo',
  async (request: FastifyRequest, reply: FastifyReply) => {
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
  },
);

export default app;
