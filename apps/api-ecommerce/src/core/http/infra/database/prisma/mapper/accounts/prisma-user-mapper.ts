import { User as RawUser } from '@prisma/client';

import { User } from '@/core/modules/accounts/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password_hash: user.password,
      phone: user.phone,
      role: user.role,
      type: user.type,
      created_at: user.createdAt,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password_hash,
        phone: raw.phone,
        role: raw.role,
        type: raw.type,
        createdAt: raw.created_at,
      },
      raw.id,
    );
  }
}
