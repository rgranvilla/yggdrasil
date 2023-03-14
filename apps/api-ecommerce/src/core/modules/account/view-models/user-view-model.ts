import { User } from '@/core/modules/account/entities/user';

export class UserViewModel {
  static toHTTP(user: User) {
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
}
