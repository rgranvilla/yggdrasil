import { PrismaUsersRepository } from '@/prisma/repositories/prisma-users-repository';
import { CreateUserUseCase } from '../use-cases/create-user/create-user-use-cases';

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);

  return createUserUseCase;
}
