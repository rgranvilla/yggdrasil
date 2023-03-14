import { expect, describe, it, beforeEach } from 'vitest';

import { AuthenticateUseCase } from './authenticate-use-case';

import { makeNewUser } from '../../factories/make-new-user';

import { InvalidCredentialsError } from '@/shared/errors/invalid-credentials-error';
import { InMemoryUsersRepository } from '@/shared/infra/database/in-memory/repositories/account/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    await usersRepository.create(await makeNewUser());

    const { user } = await sut.execute({
      email: 'johndoe@mail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await usersRepository.create(await makeNewUser());

    expect(async () => {
      await sut.execute({
        email: 'wrong@mail.com',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
