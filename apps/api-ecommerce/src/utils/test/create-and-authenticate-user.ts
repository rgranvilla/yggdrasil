import { prisma } from '@/prisma/lib/';
import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'CUSTOMER',
    },
  });

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@mail.com',
    password: '123456',
  });

  const { token } = authResponse.body;

  return {
    token,
  };
}
