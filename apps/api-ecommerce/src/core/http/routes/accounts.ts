import { FastifyInstance } from 'fastify';
import { authenticate } from '../controllers/accounts/authenticate';
import { profile } from '../controllers/accounts/profile';
import { refresh } from '../controllers/accounts/refresh';
import { users } from '../controllers/accounts/users';
import { verifyJwt } from '../middlewares/verify-jwt';

export async function accountRoutes(app: FastifyInstance) {
  app.post('/users', users);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refresh);

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile);
}
