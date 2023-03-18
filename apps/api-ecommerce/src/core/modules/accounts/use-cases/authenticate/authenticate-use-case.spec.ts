import { expect, describe, it, beforeEach } from 'vitest';

import { AuthenticateUseCase } from './authenticate-use-case';

import { makeNewUser } from '../../factories/make-new-user';

import { InvalidCredentialsError } from '@/shared/errors/invalid-credentials-error';
import { hash } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/core/http/infra/database/in-memory/repositories/accounts/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    await usersRepository.create(
      await makeNewUser({ password: await hash('123456', 6) }),
    );

    const { user } = await sut.execute({
      email: 'johndoe@mail.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await usersRepository.create(
      await makeNewUser({ password: await hash('123456', 6) }),
    );

    expect(async () => {
      await sut.execute({
        email: 'wrong@mail.com',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
