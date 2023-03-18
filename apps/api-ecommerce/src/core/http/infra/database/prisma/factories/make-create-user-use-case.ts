import { PrismaUsersRepository } from '../repositories/accounts/prisma-users-repository';
import { CreateUserUseCase } from '@/core/modules/accounts/use-cases/create-user/create-user-use-cases';

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);

  return createUserUseCase;
}
