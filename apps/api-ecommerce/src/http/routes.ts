import { FastifyInstance } from "fastify";
import { users } from "./controllers/users";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", users);
}
