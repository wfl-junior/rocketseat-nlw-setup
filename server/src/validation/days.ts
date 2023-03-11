import { z } from "zod";

export const daysParamsValidationSchema = z.object({
  date: z.coerce.date(),
});
