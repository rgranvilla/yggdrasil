import { beforeEach, describe, expect, it } from 'vitest';
import { CreateUserUseCase } from './create-user-use-cases';
import { compare } from 'bcryptjs';

import { UserAlreadyExistsError } from '@/shared/errors/user-already-exists-error';
import { InMemoryUsersRepository } from '@/shared/infra/database/in-memory/repositories/account/in-memory-users-repository';

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
      type: 'PERSON',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
      type: 'PERSON',
    });

    const isPasswordCorrectlyHashed = await compare('123456', user.password);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to create an user with email already exists.', async () => {
    const email = 'johndoe@mail.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
      type: 'PERSON',
    });

    expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
        type: 'PERSON',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
