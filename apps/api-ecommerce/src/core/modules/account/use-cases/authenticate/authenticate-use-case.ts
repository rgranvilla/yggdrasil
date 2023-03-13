import { UserDTO } from '../../dtos/userDTO';
import { InvalidCredentialsError } from '@/core/errors/invalid-credentials-error';
import { UsersRepository } from '../../repositories/users-repository';
import { compare } from 'bcryptjs';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: UserDTO;
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

    const doestPasswordMatches = await compare(password, user.password_hash);

    if (!doestPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
