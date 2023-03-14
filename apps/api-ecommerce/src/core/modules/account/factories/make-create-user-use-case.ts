import { CreateUserUseCase } from '../use-cases/create-user/create-user-use-cases';

import { PrismaUsersRepository } from '@/shared/infra/database/prisma/repositories/prisma-users-repository';

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);

  return createUserUseCase;
}
