import { UsersRepository } from '@/core/modules/account/repositories/users-repository';
import { Prisma, User } from '@prisma/client';

import { randomUUID } from 'crypto';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.items.find((item) => item.id === id) || null;
  }

  async findByEmail(email: string) {
    return this.items.find((item) => item.email === email) || null;
  }

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      role: data.role || 'CUSTOMER',
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
