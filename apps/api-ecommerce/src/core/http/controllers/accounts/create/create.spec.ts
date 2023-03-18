import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create User (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create an user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: '123456',
      type: 'PERSON',
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body.user).toEqual(
      expect.objectContaining({ email: 'johndoe@mail.com' }),
    );
  });
});
