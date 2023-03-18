import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';
import { createAndAuthenticateUser } from '@/shared/utils/test/create-and-authenticate-user';

describe('Update User (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to update role of an user', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const customer = await request(app.server).post('/users').send({
      name: 'Customer',
      email: 'customer@mail.com',
      password: '123456',
      type: 'PERSON',
    });

    const id = customer.body.user.id;

    const response = await request(app.server)
      .patch(`/admin/${id}/update-user`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        role: 'ADMIN',
      });

    expect(response.body.user.role).toBe('ADMIN');
  });
});
