import { describe, expect, it } from 'vitest';
import { User } from './user';

describe('User', () => {
  it('should be able to create a new user', async () => {
    const { id, name, email, password, role, type, createdAt } = new User({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'Aa123456',
      type: 'PERSON',
    });

    expect(name).toBe('John Doe');
    expect(email).toBe('johndoe@mail.com');
    expect(role).toBe('CUSTOMER');
    expect(type).toBe('PERSON');
    expect(id).toBeTruthy();
    expect(createdAt).toBeTruthy();
    expect(password).toBeTruthy();
  });

  it('should be able set user values directly', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'Aa123456',
      type: 'PERSON',
    });

    user.name = 'Mary';
    user.email = 'mary@mail.com';
    user.password = '123456';
    user.phone = '9999999999999';
    user.role = 'CUSTOMER';
    user.type = 'PERSON';

    expect(user.name).toBe('Mary');
    expect(user.email).toBe('mary@mail.com');
    expect(user.role).toBe('CUSTOMER');
    expect(user.type).toBe('PERSON');
    expect(user.id).toBeTruthy();
    expect(user.createdAt).toBeTruthy();
    expect(user.password).toBeTruthy();
  });
});
