import { User } from '@/core/modules/account/entities/user';

export class UserMapper {
  static toDomain(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      createdAt: user.createdAt,
    };
  }
}
