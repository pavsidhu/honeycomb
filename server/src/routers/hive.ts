import { z } from "zod";

import Hive from "../models/Hive";
import { router, publicProcedure } from "../trpc";

const getHiveByIdSchema = z.object({ id: z.string() });
const getHiveById = publicProcedure
  .input(getHiveByIdSchema)
  .mutation(({ input }) => {
    return Hive.query().where({ id: input.id }).first();
  });

const createHiveSchema = z.object({
  name: z.string(),
  location: z.string(),
  description: z.string(),
});
const createHive = publicProcedure
  .input(createHiveSchema)
  .mutation(({ input }) => {
    return Hive.query().insert({
      name: input.name,
      location: input.location,
      description: input.description,
    });
  });

export const hiveRouter = router({ getHiveById, createHive });
