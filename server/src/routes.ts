import dayjs from "dayjs";
import type { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import { daysParamsValidationSchema } from "./validation/days";
import { createHabitValidationSchema } from "./validation/habits";

export async function appRoutes(app: FastifyInstance) {
  app.get("/habits", async () => {
    const habits = await prisma.habit.findMany();

    return {
      ok: true,
      habits,
    };
  });

  app.post("/habits", async (request, response) => {
    const { title, weekDays } = createHabitValidationSchema.parse(request.body);

    const habit = await prisma.habit.create({
      data: {
        title,
        createdAt: dayjs().startOf("day").toDate(),
        weekDays: {
          create: weekDays.map(weekDay => ({ weekDay })),
        },
      },
    });

    return response.status(201).send({
      ok: true,
      habit,
    });
  });

  app.get("/days", async request => {
    const { date } = daysParamsValidationSchema.parse(request.query);
    const startOfDate = dayjs(date).startOf("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        createdAt: {
          lte: startOfDate.toDate(),
        },
        weekDays: {
          some: {
            weekDay: startOfDate.get("day"),
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: startOfDate.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    return {
      ok: true,
      possibleHabits,
      completedHabits: day?.dayHabits.map(dayHabit => dayHabit.habitId) ?? [],
    };
  });
}
