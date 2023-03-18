import { User } from '@/core/modules/accounts/entities/user';
import { UsersRepository } from '@/core/modules/accounts/repositories/users-repository';
import { InMemoryUserMapper } from '../../mapper/accounts/in-memory-user-mapper';
import { IUserProps } from '../../@types/user';
import { ICreateUserDTO } from '@/core/modules/accounts/dtos/create-user-dto';

export class InMemoryUsersRepository implements UsersRepository {
  public items: IUserProps[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    const parsedUser = new User(user, user.id);

    return InMemoryUserMapper.toHttp(parsedUser);
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    const parsedUser = new User(user, user.id);

    return InMemoryUserMapper.toHttp(parsedUser);
  }

  async create(user: ICreateUserDTO) {
    const newUser = new User({
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone ?? null,
      type: user.type,
    });

    this.items.push(InMemoryUserMapper.toDatabase(newUser));

    return InMemoryUserMapper.toHttp(newUser);
  }

  async save(user: User): Promise<User> {
    const userIndex = this.items.findIndex((item) => item.id === user.id);

    if (userIndex >= 0) {
      this.items[userIndex] = InMemoryUserMapper.toDatabase(user);
    }

    return InMemoryUserMapper.toHttp(user);
  }
}
