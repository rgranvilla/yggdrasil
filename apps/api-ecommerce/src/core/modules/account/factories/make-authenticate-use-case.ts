import { AuthenticateUseCase } from '../use-cases/authenticate/authenticate-use-case';

import { PrismaUsersRepository } from '@/shared/infra/database/prisma/repositories/prisma-users-repository';

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
