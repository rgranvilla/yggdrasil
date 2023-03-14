import { compare } from 'bcryptjs';

import { User } from '../../entities/user';

import { UsersRepository } from '../../repositories/users-repository';

import { InvalidCredentialsError } from '@/shared/errors/invalid-credentials-error';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doestPasswordMatches = await compare(password, user.password);

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
