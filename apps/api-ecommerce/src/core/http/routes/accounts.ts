import { FastifyInstance } from 'fastify';
import { authenticate } from '../controllers/accounts/authenticate/authenticate';
import { profile } from '../controllers/accounts/profile/profile';
import { create } from '../controllers/accounts/create/create';
import { verifyJwt } from '../middlewares/verify-jwt';
import { refresh } from '../controllers/accounts/refresh/refresh';

export async function accountRoutes(app: FastifyInstance) {
  app.post('/users', create);
  app.post('/sessions', authenticate);
  app.patch('/token/refresh', refresh);

  app.post('/sessions/logout', async (request, reply) => {
    reply
      .clearCookie('refreshToken')
      .send({ message: 'Logout realizado com sucesso' });
  });

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile);
}
