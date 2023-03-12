import { UserAlreadyExistsError } from '@/errors/user-already-exists-error';
import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: CreateUserUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
