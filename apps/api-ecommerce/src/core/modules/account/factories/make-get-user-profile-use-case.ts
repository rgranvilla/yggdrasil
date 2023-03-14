import { GetUserProfileUseCase } from '../use-cases/get-user-profile/get-user-profile';

import { PrismaUsersRepository } from '@/shared/infra/database/prisma/repositories/prisma-users-repository';

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(usersRepository);

  return useCase;
}
