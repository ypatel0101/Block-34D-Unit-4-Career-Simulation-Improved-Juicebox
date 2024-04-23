
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const alice = await prisma.user.create({
    data: {
      username: 'Alice',
      password: 'password123',
    },
  });

  const bob = await prisma.user.create({
    data: {
      username: 'Bob',
      password: 'password456',
    },
  });

  const charlie = await prisma.user.create({
    data: {
      username: 'Charlie',
      password: 'password789', 
    },
  });

  await prisma.post.createMany({
    data: [
      { title: 'First post', content: 'Content for the first post', userId: alice.id },
      { title: 'Second post', content: 'Content for the second post', userId: alice.id },
      { title: 'Third post', content: 'Content for the third post', userId: alice.id },
      { title: 'Bob\'s first post', content: 'Content for Bob\'s first post', userId: bob.id },
      { title: 'Bob\'s second post', content: 'Content for Bob\'s second post', userId: bob.id },
      { title: 'Bob\'s third post', content: 'Content for Bob\'s third post', userId: bob.id },
      { title: 'Charlie\'s musings', content: 'Content for Charlie\'s musings', userId: charlie.id },
      { title: 'Charlie\'s thoughts', content: 'Content for Charlie\'s thoughts', userId: charlie.id },
      { title: 'Charlie\'s reflections', content: 'Content for Charlie\'s reflections', userId: charlie.id },
    ],
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
