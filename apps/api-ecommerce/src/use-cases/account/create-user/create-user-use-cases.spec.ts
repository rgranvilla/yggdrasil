import { describe, expect, it } from 'vitest';
import { CreateUserUseCase } from './create-user-use-cases';
import { compare } from 'bcryptjs';

describe('Create User Use Case', () => {
  it('should hash user password upon registration', async () => {
    const createUserUseCase = new CreateUserUseCase({
      async findByEmail(email) {
        return null;
      },

      async create(data) {
        return {
          id: 'user-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

    const { user } = await createUserUseCase.execute({
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
});
