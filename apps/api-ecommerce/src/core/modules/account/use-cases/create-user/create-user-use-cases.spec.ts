import { beforeEach, describe, expect, it } from 'vitest';
import { CreateUserUseCase } from './create-user-use-cases';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/in-memory/repositories/in-memory-users-repository';
import { UserAlreadyExistsError } from '@/core/errors/user-already-exists-error';

let usersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(usersRepository);
  });

  it('should to create an user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
    });

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to create an user with email already exists.', async () => {
    const email = 'johndoe@mail.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    });

    expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
