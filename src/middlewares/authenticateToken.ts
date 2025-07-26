import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import db from '../lib/prisma.js';

export async function authenticateToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authHeader = request.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return reply
      .status(400)
      .send({ error: true, message: 'token not provided' });
  }

  try {
    const decoded = (await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
    )) as {
      userId: string;
    };
    request.user = { db, userId: decoded.userId };
  } catch (error: any) {
    return reply.status(400).send({
      error: true,
      message: error.message,
    });
  }
}
