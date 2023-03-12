import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { CreateUserUseCase } from '@/use-cases/account/create-user-use-cases';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';

export async function users(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const createUserUseCase = new CreateUserUseCase(usersRepository);

    await createUserUseCase.execute({
      name,
      email,
      password,
    });
  } catch (err) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
