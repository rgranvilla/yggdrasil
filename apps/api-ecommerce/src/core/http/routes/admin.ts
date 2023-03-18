import { FastifyInstance } from 'fastify';

import { verifyJwt } from '../middlewares/verify-jwt';
import { verifyUserRole } from '../middlewares/verify-user-role';
import { updateUser } from '../controllers/accounts/admin/update-user/update-user';

export async function adminRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt);
  app.addHook('onRequest', verifyUserRole('ADMIN'));

  app.patch('/admin/:userId/update-user', updateUser);
}
