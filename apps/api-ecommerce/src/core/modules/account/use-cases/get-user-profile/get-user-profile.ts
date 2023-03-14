import { UserMapper } from '../../mapper/user-mapper';
import { GetUserProfileDTO } from '../../dtos/get-user-profile-dto';
import { UsersRepository } from '../../repositories/users-repository';

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error';

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: GetUserProfileDTO;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const raw = await this.usersRepository.findById(userId);

    if (!raw) {
      throw new ResourceNotFoundError();
    }

    const user = UserMapper.toDomain(raw);

    return {
      user,
    };
  }
}
