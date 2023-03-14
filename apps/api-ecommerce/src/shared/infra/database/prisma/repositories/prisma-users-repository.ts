import { prisma } from '../lib/';
import { PrismaUserMapper } from '../mapper/account/prisma-user-mapper';

import { User } from '@/core/modules/account/entities/user';
import { UsersRepository } from '@/core/modules/account/repositories/users-repository';

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

  async create(user: User): Promise<User> {
    const raw = PrismaUserMapper.toPrisma(user);

    await prisma.user.create({
      data: raw,
    });

    return user;
  }
}
