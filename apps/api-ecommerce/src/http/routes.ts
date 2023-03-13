import { FastifyInstance } from 'fastify';
import { users } from './controllers/users';
import { authenticate } from './controllers/authenticate';
import { profile } from './controllers/profile';
import { verifyJwt } from './middlewares/verify-jwt';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', users);
  app.post('/sessions', authenticate);

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJwt] }, profile);
}
