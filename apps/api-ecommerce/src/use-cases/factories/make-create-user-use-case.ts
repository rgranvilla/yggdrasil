import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { CreateUserUseCase } from '../account/create-user/create-user-use-cases';

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);

  return createUserUseCase;
}
