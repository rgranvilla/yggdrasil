import { prisma } from '../../lib/';
import { PrismaUserMapper } from '../../mapper/accounts/prisma-user-mapper';

import { User } from '@/core/modules/accounts/entities/user';
import { UsersRepository } from '@/core/modules/accounts/repositories/users-repository';

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

  async save(data: User): Promise<User> {
    const raw = PrismaUserMapper.toPrisma(data);

    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data: raw,
    });

    return PrismaUserMapper.toDomain(user);
  }
}
