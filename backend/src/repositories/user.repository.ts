import prisma from '@config/database';
import { IUser, UserRole } from '../types';
import { Prisma } from '@prisma/client';

export class UserRepository {
  async findById(id: string): Promise<IUser | null> {
    return prisma.user.findUnique({
      where: { id },
    }) as Promise<IUser | null>;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return prisma.user.findUnique({
      where: { email },
    }) as Promise<IUser | null>;
  }

  async create(data: {
    name: string;
    email: string;
    password: string;
    address?: string;
    role?: UserRole;
  }): Promise<IUser> {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        address: data.address,
        role: data.role || 'NORMAL_USER',
      },
    }) as Promise<IUser>;
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser> {
    return prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        address: data.address,
        role: (data.role as any),
      },
    }) as Promise<IUser>;
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }

  async findAll(
    page: number = 1,
    pageSize: number = 10,
    search?: string,
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc',
    role?: UserRole
  ): Promise<{ data: IUser[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const searchFilter: Prisma.UserWhereInput = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
            { address: { contains: search } },
          ],
        }
      : {};

    const roleFilter: Prisma.UserWhereInput = role ? { role } : {};

    const where: Prisma.UserWhereInput = {
      ...searchFilter,
      ...roleFilter,
    };

    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return { data: data as IUser[], total };
  }

  async count(): Promise<number> {
    return prisma.user.count();
  }
}

export const userRepository = new UserRepository();
