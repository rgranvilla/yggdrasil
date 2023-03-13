import { PrismaUsersRepository } from '@/prisma/repositories/prisma-users-repository';
import { GetUserProfileUseCase } from '../account/get-user-profile/get-user-profile';

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(usersRepository);

  return useCase;
}
