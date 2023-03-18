import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeUpdateUserUseCase } from '@/core/http/infra/database/prisma/factories/make-update-user-use-case';
import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error';
import { UserViewModel } from '@/core/modules/accounts/view-models/user-view-model';

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  const updateUserParamsSchema = z.object({
    userId: z.string().uuid(),
  });

  const { userId } = updateUserParamsSchema.parse(request.params);

  const updateUserBodySchema = z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    role: z.enum(['ADMIN', 'CUSTOMER']).optional(),
    type: z.enum(['PERSON', 'ENTITY']).optional(),
  });

  const toUpdate = updateUserBodySchema.parse(request.body);

  try {
    const updateUserUseCase = makeUpdateUserUseCase();

    const { user } = await updateUserUseCase.execute({
      userId,
      data: toUpdate,
    });

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const { role, sub } = request.user;

    const logoutIsNeeded =
      role === 'ADMIN' && userId === sub && toUpdate.role !== 'ADMIN';

    if (logoutIsNeeded) {
      return reply
        .status(200)
        .clearCookie('refreshToken')
        .send({
          user: UserViewModel.toHTTP(user),
          message:
            'Your user has been logged out. You need to perform a new login to proceed.',
        });
    } else {
      return reply.status(200).send({
        user: UserViewModel.toHTTP(user),
      });
    }
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
