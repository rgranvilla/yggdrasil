import { FastifyInstance } from 'fastify';
import { authenticate } from '../controllers/accounts/authenticate/authenticate';
import { profile } from '../controllers/accounts/profile/profile';
import { refresh } from '../controllers/accounts/refresh/refresh';
import { create } from '../controllers/accounts/create/create';
import { verifyJwt } from '../middlewares/verify-jwt';

export async function accountRoutes(app: FastifyInstance) {
  app.post('/users', create);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refresh);

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile);
}
