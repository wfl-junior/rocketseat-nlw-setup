import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

const firstHabitId = randomUUID();
const firstHabitCreationDate = new Date("2022-12-31T03:00:00.000Z");

const secondHabitId = randomUUID();
const secondHabitCreationDate = new Date("2023-01-03T03:00:00.000Z");

const thirdHabitId = randomUUID();
const thirdHabitCreationDate = new Date("2023-01-08T03:00:00.000Z");

async function main() {
  await prisma.$transaction(async transaction => {
    await transaction.habit.deleteMany();
    await transaction.day.deleteMany();

    await Promise.all([
      transaction.habit.create({
        data: {
          id: firstHabitId,
          title: "Beber 2L de água",
          createdAt: firstHabitCreationDate,
          weekDays: {
            create: [{ weekDay: 1 }, { weekDay: 2 }, { weekDay: 3 }],
          },
        },
      }),
      transaction.habit.create({
        data: {
          id: secondHabitId,
          title: "Exercitar",
          createdAt: secondHabitCreationDate,
          weekDays: {
            create: [{ weekDay: 3 }, { weekDay: 4 }, { weekDay: 5 }],
          },
        },
      }),
      transaction.habit.create({
        data: {
          id: thirdHabitId,
          title: "Dormir 8hrs",
          createdAt: thirdHabitCreationDate,
          weekDays: {
            create: [
              { weekDay: 1 },
              { weekDay: 2 },
              { weekDay: 3 },
              { weekDay: 4 },
              { weekDay: 5 },
            ],
          },
        },
      }),
    ]);

    await Promise.all([
      transaction.day.create({
        data: {
          date: new Date("2023-01-06T03:00:00.000Z"),
          dayHabits: {
            create: {
              habitId: firstHabitId,
            },
          },
        },
      }),
      transaction.day.create({
        data: {
          date: new Date("2023-01-04T03:00:00.000Z"),
          dayHabits: {
            create: {
              habitId: firstHabitId,
            },
          },
        },
      }),
      transaction.day.create({
        data: {
          date: new Date("2023-01-02T03:00:00.000Z"),
          dayHabits: {
            create: [{ habitId: firstHabitId }, { habitId: secondHabitId }],
          },
        },
      }),
    ]);
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async error => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
