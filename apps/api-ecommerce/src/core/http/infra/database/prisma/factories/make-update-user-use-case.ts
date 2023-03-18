import { PrismaUsersRepository } from '../repositories/accounts/prisma-users-repository';
import { UpdateUserUseCase } from '@/core/modules/accounts/admin/use-cases/update-user/update-user-use-case';

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const updateUserUseCase = new UpdateUserUseCase(usersRepository);

  return updateUserUseCase;
}
