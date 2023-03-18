import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeCreateUserUseCase } from '@/core/http/infra/database/prisma/factories/make-create-user-use-case';

import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error';
import { UserViewModel } from '@/core/modules/accounts/view-models/user-view-model';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    type: z.enum(['PERSON', 'ENTITY']),
  });

  const { name, email, password, type } = registerBodySchema.parse(
    request.body,
  );

  try {
    const createUserUseCase = makeCreateUserUseCase();

    const { user } = await createUserUseCase.execute({
      name,
      email,
      password,
      type,
    });

    const response = UserViewModel.toHTTP(user);

    return reply.status(201).send({
      user: {
        ...response,
        password: undefined,
      },
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
