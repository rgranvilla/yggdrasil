import { describe, expect, it } from 'vitest';
import { User } from './user';

describe('User', () => {
  it('should be able to create a new user', async () => {
    const { id, name, email, password, role, createdAt } = new User({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'Aa123456',
      type: 'PERSON',
    });

    expect(name).toBe('John Doe');
    expect(email).toBe('johndoe@mail.com');
    expect(role).toBe('CUSTOMER');
    expect(id).toBeTruthy();
    expect(createdAt).toBeTruthy();
    expect(password).toBeTruthy();
  });
});
