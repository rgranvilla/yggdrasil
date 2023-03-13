import { PrismaUsersRepository } from '@/prisma/repositories/prisma-users-repository';
import { AuthenticateUseCase } from '../use-cases/authenticate/authenticate-use-case';

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
