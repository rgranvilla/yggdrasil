import { User as RawUser } from '@prisma/client';

import { User } from '@/core/modules/account/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password_hash: user.password,
      role: user.role,
      created_at: user.createdAt,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password_hash,
        role: raw.role,
      },
      raw.id,
    );
  }
}
