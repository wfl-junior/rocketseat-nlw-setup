import { FastifyInstance } from "fastify";
import { prisma } from "~/lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  app.get("/summary", async () => {
    const summary = await prisma.$queryRaw`
      SELECT
        d.id,
        d.date,
        (
          SELECT CAST(COUNT(*) as FLOAT)
          FROM day_habits dh
          WHERE dh."dayId" = d.id
        ) as completed,
        (
          SELECT  CAST(COUNT(*) as FLOAT)
          FROM habit_week_days hwd
          JOIN habits h
            ON h.id = hwd."habitId"
          WHERE 
            hwd."weekDay" = STRFTIME('%w', d.date / 1000, 'unixepoch')
            AND h."createdAt" <= d.date
        ) as amount
      FROM days d;
    `;

    return {
      ok: true,
      summary,
    };
  });
}
