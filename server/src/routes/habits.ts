import dayjs from "dayjs";
import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import {
  createHabitValidationSchema,
  toggleHabitParams,
} from "../validation/habits";

// prefix: /habits
export async function habitsRoutes(app: FastifyInstance) {
  app.get("/", async () => {
    const habits = await prisma.habit.findMany();

    return {
      ok: true,
      habits,
    };
  });

  app.post("/", async (request, response) => {
    const { title, weekDays } = createHabitValidationSchema.parse(request.body);
    const today = dayjs().startOf("day").toDate();

    const habit = await prisma.habit.create({
      data: {
        title,
        createdAt: today,
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

  app.patch("/:id/toggle", async (request, response) => {
    const { id } = toggleHabitParams.parse(request.params);
    const startOfDay = dayjs().startOf("day");
    const today = startOfDay.toDate();

    const habitWeekDay = await prisma.habitWeekDays.findUnique({
      where: {
        habitId_weekDay: {
          habitId: id,
          weekDay: startOfDay.get("day"),
        },
      },
    });

    if (!habitWeekDay) {
      return response.status(400).send({
        ok: false,
        message:
          "Não é possível fazer toggle de um hábito para um dia que não foi criado.",
      });
    }

    const action = await prisma.$transaction(async transaction => {
      let day = await transaction.day.findUnique({
        where: {
          date: today,
        },
      });

      if (!day) {
        day = await transaction.day.create({
          data: {
            date: today,
          },
        });
      }

      const dayHabit = await transaction.dayHabit.findUnique({
        where: {
          habitId_dayId: {
            habitId: id,
            dayId: day.id,
          },
        },
      });

      if (dayHabit) {
        await transaction.dayHabit.delete({
          where: {
            id: dayHabit.id,
          },
        });

        return "deleted";
      }

      await transaction.dayHabit.create({
        data: {
          habitId: id,
          dayId: day.id,
        },
      });

      return "created";
    });

    return {
      ok: true,
      action,
    };
  });
}
