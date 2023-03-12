import dayjs from "dayjs";
import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { daysParamsValidationSchema } from "../validation/days";

// prefix: /days
export async function daysRoutes(app: FastifyInstance) {
  app.get("/", async request => {
    const { date } = daysParamsValidationSchema.parse(request.query);
    const startOfDate = dayjs(date).startOf("day");
    console.log(startOfDate.toISOString());

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
