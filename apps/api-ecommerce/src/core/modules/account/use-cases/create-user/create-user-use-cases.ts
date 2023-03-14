import { hash } from 'bcryptjs';

import { User } from '../../entities/user';

import { UsersRepository } from '../../repositories/users-repository';

import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error';

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  type: 'PERSON' | 'ENTITY';
}

interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    type,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await hash(password, 6);

    const user = new User({
      name,
      email,
      password: passwordHash,
      type,
    });

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}
