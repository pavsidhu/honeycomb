import { z } from "zod";

import Plan from "../models/Plan";
import { router, publicProcedure } from "../trpc";

const getPlanByIdSchema = z.object({ id: z.string() });
const getPlanById = publicProcedure
  .input(getPlanByIdSchema)
  .mutation(({ input }) => {
    return Plan.query().where({ id: input.id }).first();
  });

const createPlanSchema = z.object({
  name: z.string(),
  date: z.date(),
  location: z.string(),
  description: z.string(),
});
const createPlan = publicProcedure
  .input(createPlanSchema)
  .mutation(({ input }) => {
    return Plan.query().insert({
      name: input.name,
      date: input.date.toISOString(),
      location: input.location,
      description: input.description,
    });
  });

export const planRouter = router({ getPlanById, createPlan });
