import { User } from '@/core/modules/accounts/entities/user';

export class InMemoryUserMapper {
  static toDatabase(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      phone: user.phone,
      role: user.role,
      type: user.type,
      createdAt: user.createdAt,
    };
  }

  static toHttp(raw: User): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        phone: raw.phone,
        role: raw.role,
        type: raw.type,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
