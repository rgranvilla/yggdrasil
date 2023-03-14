import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeCreateUserUseCase } from '@/core/modules/account/factories/make-create-user-use-case';

import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error';

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const createUserUseCase = makeCreateUserUseCase();

    await createUserUseCase.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
}
