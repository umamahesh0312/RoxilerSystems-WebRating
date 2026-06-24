import { PrismaClient, UserRole } from '@prisma/client';
import { PasswordUtils } from '../src/utils/password';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.rating.deleteMany();
  await prisma.store.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await PasswordUtils.hashPassword('Admin@123');
  const admin = await prisma.user.create({
    data: {
      id: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
      name: 'Admin User',
      email: 'admin@roxsys.com',
      password: adminPassword,
      address: 'Admin Street, City',
      role: UserRole.ADMIN,
    },
  });

  console.log('✓ Created admin user:', admin.email);

  // Create store owners
  const owner1Password = await PasswordUtils.hashPassword('Owner1@123');
  const owner1 = await prisma.user.create({
    data: {
      id: '2a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
      name: 'Store Owner One',
      email: 'owner1@roxsys.com',
      password: owner1Password,
      address: 'Owner Street 1, City',
      role: UserRole.STORE_OWNER,
    },
  });

  const owner2Password = await PasswordUtils.hashPassword('Owner2@123');
  const owner2 = await prisma.user.create({
    data: {
      id: '3a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
      name: 'Store Owner Two',
      email: 'owner2@roxsys.com',
      password: owner2Password,
      address: 'Owner Street 2, City',
      role: UserRole.STORE_OWNER,
    },
  });

  console.log('✓ Created store owners:', owner1.email, owner2.email);

  // Create regular users
  const user1Password = await PasswordUtils.hashPassword('User1@123');
  const user1 = await prisma.user.create({
    data: {
      id: '4a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
      name: 'User One',
      email: 'user1@roxsys.com',
      password: user1Password,
      address: 'User Street 1, City',
      role: UserRole.NORMAL_USER,
    },
  });

  const user2Password = await PasswordUtils.hashPassword('User2@123');
  const user2 = await prisma.user.create({
    data: {
      id: '5a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
      name: 'User Two',
      email: 'user2@roxsys.com',
      password: user2Password,
      address: 'User Street 2, City',
      role: UserRole.NORMAL_USER,
    },
  });

  const user3Password = await PasswordUtils.hashPassword('User3@123');
  const user3 = await prisma.user.create({
    data: {
      id: '6a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
      name: 'User Three',
      email: 'user3@roxsys.com',
      password: user3Password,
      address: 'User Street 3, City',
      role: UserRole.NORMAL_USER,
    },
  });

  console.log('✓ Created regular users:', user1.email, user2.email, user3.email);

  // Create stores
  const store1 = await prisma.store.create({
    data: {
      id: '7a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
      name: 'Premium Electronics Store',
      email: 'premium@store.com',
      address: '123 Main Street, Downtown City',
      ownerId: owner1.id,
    },
  });

  const store2 = await prisma.store.create({
    data: {
      id: '8a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
      name: 'Fashion Hub Mall',
      email: 'fashion@store.com',
      address: '456 Fashion Avenue, Shopping District',
      ownerId: owner1.id,
    },
  });

  const store3 = await prisma.store.create({
    data: {
      id: '9a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
      name: 'Grocery Express',
      email: 'grocery@store.com',
      address: '789 Market Road, Residential Area',
      ownerId: owner2.id,
    },
  });

  const store4 = await prisma.store.create({
    data: {
      id: '10a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
      name: 'Coffee Corner Cafe',
      email: 'coffee@store.com',
      address: '321 Brew Lane, City Center',
      ownerId: owner2.id,
    },
  });

  console.log('✓ Created 4 stores');

  // Create ratings
  const ratings = [
    { userId: user1.id, storeId: store1.id, rating: 5 },
    { userId: user1.id, storeId: store2.id, rating: 4 },
    { userId: user2.id, storeId: store1.id, rating: 4 },
    { userId: user2.id, storeId: store3.id, rating: 5 },
    { userId: user3.id, storeId: store1.id, rating: 3 },
    { userId: user3.id, storeId: store4.id, rating: 5 },
  ];

  for (const rating of ratings) {
    await prisma.rating.create({
      data: rating,
    });
  }

  // Update store stats
  for (const store of [store1, store2, store3, store4]) {
    const stats = await prisma.rating.aggregate({
      where: { storeId: store.id },
      _avg: { rating: true },
      _count: { id: true },
    });

    await prisma.store.update({
      where: { id: store.id },
      data: {
        averageRating: stats._avg.rating || 0,
        totalRatings: stats._count.id || 0,
      },
    });
  }

  console.log('✓ Created 6 ratings and updated store statistics');
  console.log('\n✓ Database seeding completed successfully!');
  console.log('\nTest Credentials:');
  console.log('Admin: admin@roxsys.com / Admin@123');
  console.log('Store Owner: owner1@roxsys.com / Owner1@123');
  console.log('Regular User: user1@roxsys.com / User1@123');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
