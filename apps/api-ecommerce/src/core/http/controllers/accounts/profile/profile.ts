import { FastifyReply, FastifyRequest } from 'fastify';

import { makeGetUserProfileUseCase } from '@/core/http/infra/database/prisma/factories/make-get-user-profile-use-case';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  return reply.status(200).send({
    user: {
      ...user,
      password: undefined,
    },
  });
}
