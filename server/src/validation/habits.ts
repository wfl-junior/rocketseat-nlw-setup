import { z } from "zod";

export const createHabitValidationSchema = z.object({
  title: z.string(),
  weekDays: z.array(z.number().int().min(0).max(6)).min(1),
});
