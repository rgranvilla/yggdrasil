import { User } from '@/core/modules/accounts/entities/user';
import { UsersRepository } from '@/core/modules/accounts/repositories/users-repository';

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error';
import { UpdateUserProps } from '../../types/update-user-dto';

interface UpdateUserUseCaseRequest {
  userId: string;
  data: Partial<UpdateUserProps>;
}

interface UpdateUsersUseCaseResponse {
  user: User;
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    data,
  }: UpdateUserUseCaseRequest): Promise<UpdateUsersUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const userToUpdate = new User(
      {
        name: data.name ?? user.name,
        email: user.email,
        password: user.password,
        phone: data.phone ?? user.phone,
        role: data.role ?? user.role,
        type: data.type ?? user.type,
        createdAt: user.createdAt,
      },
      userId,
    );

    const updatedUser = await this.usersRepository.save(userToUpdate);

    return {
      user: updatedUser,
    };
  }
}
