import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const TASKS = [
  {
    title: 'Supermercado',
    description: 'Ir ao supermercado realizar as compras do mês.',
    userId: 1,
  },
  {
    title: 'Banco',
    description: 'Ir ao banco conversaro como gerente sobre o imprestimo.',
    userId: 1,
  },
  {
    title: 'Carro',
    description: 'Levar o carro para lavar.',
    userId: 1,
  },
];

async function seedUserAdmin() {
  const userExists = await prisma.user.findFirst({
    where: { email: 'eemr3@email.com' },
  });

  if (userExists) return console.info('[SEED] Admin já cadastrado');

  await prisma.user
    .create({
      data: {
        name: 'John Doe',
        email: 'john.doe@email.com',
        password: '$2b$10$y3NB9TO1dcVyMc01MA27/OB/SWHYNYlc6ryI1ZJdcL6eBQNVJito2', //senha: Abc12@34
        createdAt: new Date(),
      },
    })
    .then(() => console.info('[SEED] Successfully create user admin record'))
    .catch((e) => console.info('[SEED] Successfully create user admin record', e));
}

seedUserAdmin();

async function seedTasks() {
  // const tasks = await Promise.all(
  //   TASKS.map(async (task) => {
  //     const skillExists = await prisma.todo.findMany({
  //       where: {},
  //     });
  //     if (skillExists.length !== 0) {
  //       return skillExists;
  //     }

  //     return false;
  //   }),
  // );

  // if (tasks.some((item) => item !== false)) {
  //   return console.info('[SEED] Tasks já cadastradas');
  // }

  try {
    await Promise.all(
      TASKS.map(
        async (task) =>
          await prisma.todo.create({
            data: {
              title: task.title,
              description: task.description,
              userId: task.userId,
            },
          }),
      ),
    );
    console.info('[SEED] Successfully create tasks records');
  } catch (error) {
    console.info('[SEED] Successfully create tasks records', error);
  }
}

seedTasks();
