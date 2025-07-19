import { FastifyReply, FastifyRequest } from 'fastify';

export interface RouterRequest {
  request: FastifyRequest;
  reply: FastifyReply;
}
