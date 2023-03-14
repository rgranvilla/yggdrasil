import { expect, describe, it, beforeEach } from 'vitest';

import { GetUserProfileUseCase } from './get-user-profile';

import { ResourceNotFoundError } from '@/shared/errors/resource-not-found-error';
import { InMemoryUsersRepository } from '@/shared/infra/database/in-memory/repositories/account/in-memory-users-repository';
import { makeNewUser } from '../../factories/make-new-user';

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
