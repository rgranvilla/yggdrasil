import { User } from '@/core/modules/account/entities/user';
import { UsersRepository } from '@/core/modules/account/repositories/users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string): Promise<User | null> {
    return this.items.find((item) => item.id === id) || null;
  }

  async findByEmail(email: string) {
    return this.items.find((item) => item.email === email) || null;
  }

  async create(user: User) {
    this.items.push(user);

    return user;
  }
}
