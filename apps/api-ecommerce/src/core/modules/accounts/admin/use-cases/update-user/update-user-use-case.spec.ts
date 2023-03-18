import { beforeEach, describe, expect, it } from 'vitest';

import { UpdateUserUseCase } from './update-user-use-case';

import { InMemoryUsersRepository } from '@/core/http/infra/database/in-memory/repositories/accounts/in-memory-users-repository';
import { makeNewUser } from '@/core/modules/accounts/factories/make-new-user';

let usersRepository: InMemoryUsersRepository;
let sut: UpdateUserUseCase;

describe('Update User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UpdateUserUseCase(usersRepository);
  });

  it('should to update an user', async () => {
    const createdUser = await usersRepository.create(await makeNewUser());

    const { user } = await sut.execute({
      userId: createdUser.id,
      data: {
        ...createdUser,
        role: 'ADMIN',
      },
    });

    expect(user.role).toBe('ADMIN');
  });
});
