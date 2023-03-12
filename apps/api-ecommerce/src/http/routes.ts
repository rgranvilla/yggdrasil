import { FastifyInstance } from 'fastify';
import { users } from './controllers/users';
import { authenticate } from './controllers/authenticate';

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', users);

  app.post('/sessions', authenticate);
}
