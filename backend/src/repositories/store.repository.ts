import prisma from '@config/database';
import { IStore } from '../types';
import { Prisma } from '@prisma/client';

export class StoreRepository {
  async findById(id: string): Promise<IStore | null> {
    return prisma.store.findUnique({
      where: { id },
    }) as Promise<IStore | null>;
  }

  async create(data: {
    name: string;
    email: string;
    address: string;
    ownerId: string;
  }): Promise<IStore> {
    return prisma.store.create({
      data: {
        name: data.name,
        email: data.email,
        address: data.address,
        ownerId: data.ownerId,
      },
    }) as Promise<IStore>;
  }

  async update(id: string, data: Partial<IStore>): Promise<IStore> {
    return prisma.store.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        address: data.address,
        averageRating: data.averageRating,
        totalRatings: data.totalRatings,
      },
    }) as Promise<IStore>;
  }

  async delete(id: string): Promise<void> {
    await prisma.store.delete({
      where: { id },
    });
  }

  async findAll(
    page: number = 1,
    pageSize: number = 10,
    search?: string,
    sortBy: string = 'createdAt',
    sortOrder: 'asc' | 'desc' = 'asc'
  ): Promise<{ data: IStore[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const where: Prisma.StoreWhereInput = search
      ? {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
            { address: { contains: search } },
          ],
        }
      : {};

    const [data, total] = await Promise.all([
      prisma.store.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),
      prisma.store.count({ where }),
    ]);

    return { data: data as IStore[], total };
  }

  async findByOwnerId(ownerId: string): Promise<IStore[]> {
    return prisma.store.findMany({
      where: { ownerId },
    }) as Promise<IStore[]>;
  }

  async count(): Promise<number> {
    return prisma.store.count();
  }
}

export const storeRepository = new StoreRepository();
