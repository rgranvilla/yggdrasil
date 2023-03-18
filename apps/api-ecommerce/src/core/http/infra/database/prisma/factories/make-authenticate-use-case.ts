import { PrismaUsersRepository } from '../repositories/accounts/prisma-users-repository';
import { AuthenticateUseCase } from '@/core/modules/accounts/use-cases/authenticate/authenticate-use-case';

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);

  return authenticateUseCase;
}
