import request from 'supertest';
import { FastifyInstance } from 'fastify';

import { makeNewUser } from '@/core/modules/accounts/factories/make-new-user';

import { hash } from 'bcryptjs';
import { PrismaUserMapper } from '@/core/http/infra/database/prisma/mapper/accounts/prisma-user-mapper';
import { prisma } from '@/core/http/infra/database/prisma/lib';

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
  name = 'JohnDoe',
  email = 'johndoe@mail.com',
) {
  const user = await makeNewUser({
    name,
    email,
    password: await hash('123456', 6),
    role: isAdmin ? 'ADMIN' : 'CUSTOMER',
  });

  await prisma.user.create({
    data: PrismaUserMapper.toPrisma(user),
  });

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@mail.com',
    password: '123456',
  });

  const { token, refreshToken } = authResponse.body;

  return {
    token,
    refreshToken,
  };
}
