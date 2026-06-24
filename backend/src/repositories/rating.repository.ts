import prisma from '@config/database';
import { IRating } from '@types/index';
import { Prisma } from '@prisma/client';

interface RatingWithUser extends IRating {
  user: {
    name: string;
    email: string;
  };
}

export class RatingRepository {
  async findById(id: string): Promise<IRating | null> {
    return prisma.rating.findUnique({
      where: { id },
    }) as Promise<IRating | null>;
  }

  async findByUserAndStore(userId: string, storeId: string): Promise<IRating | null> {
    return prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId,
        },
      },
    }) as Promise<IRating | null>;
  }

  async create(data: {
    userId: string;
    storeId: string;
    rating: number;
  }): Promise<IRating> {
    return prisma.rating.create({
      data: {
        userId: data.userId,
        storeId: data.storeId,
        rating: data.rating,
      },
    }) as Promise<IRating>;
  }

  async update(id: string, rating: number): Promise<IRating> {
    return prisma.rating.update({
      where: { id },
      data: { rating },
    }) as Promise<IRating>;
  }

  async delete(id: string): Promise<void> {
    await prisma.rating.delete({
      where: { id },
    });
  }

  async findByStoreId(
    storeId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<{ data: RatingWithUser[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      prisma.rating.findMany({
        where: { storeId },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.rating.count({ where: { storeId } }),
    ]);

    return { data: data as RatingWithUser[], total };
  }

  async findByUserId(
    userId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<{ data: IRating[]; total: number }> {
    const skip = (page - 1) * pageSize;

    const [data, total] = await Promise.all([
      prisma.rating.findMany({
        where: { userId },
        skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.rating.count({ where: { userId } }),
    ]);

    return { data: data as IRating[], total };
  }

  async getStoreStats(storeId: string): Promise<{ average: number; total: number }> {
    const result = await prisma.rating.aggregate({
      where: { storeId },
      _avg: {
        rating: true,
      },
      _count: {
        id: true,
      },
    });

    return {
      average: result._avg.rating || 0,
      total: result._count.id || 0,
    };
  }

  async count(): Promise<number> {
    return prisma.rating.count();
  }
}

export const ratingRepository = new RatingRepository();
