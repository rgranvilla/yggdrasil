import request from 'supertest';
import { FastifyInstance } from 'fastify';

import { makeNewUser } from '@/core/modules/account/factories/make-new-user';

import { prisma } from '@/shared/infra/database/prisma/lib';
import { PrismaUserMapper } from '@/shared/infra/database/prisma/mapper/account/prisma-user-mapper';

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  const user = await makeNewUser({ role: isAdmin ? 'ADMIN' : 'CUSTOMER' });
  await prisma.user.create({
    data: PrismaUserMapper.toPrisma(user),
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
