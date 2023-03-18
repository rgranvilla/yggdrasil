import { expect, describe, it, beforeEach } from 'vitest';

import { GetUserProfileUseCase } from './get-user-profile';
import { makeNewUser } from '../../factories/make-new-user';

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error';
import { InMemoryUsersRepository } from '@/core/http/infra/database/in-memory/repositories/accounts/in-memory-users-repository';

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create(await makeNewUser());

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual('John Doe');
  });

  it('should not be able to get user profile with wrong id', async () => {
    expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
