import { PrismaUsersRepository } from '../repositories/accounts/prisma-users-repository';
import { GetUserProfileUseCase } from '@/core/modules/accounts/use-cases/get-user-profile/get-user-profile';

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(usersRepository);

  return useCase;
}
