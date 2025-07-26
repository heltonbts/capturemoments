import fastify from 'fastify';
import routes from './routes.js';
import { fastifyMultipart } from '@fastify/multipart';
import cors from '@fastify/cors';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify({ logger: true });

app.register(cors, {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Adicionado para permitir todos os métodos comuns
});
app.register(fastifyMultipart);
app.register(routes);

app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'uploads'),
  prefix: '/uploads',
});

export default app;
