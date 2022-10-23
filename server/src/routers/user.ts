import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import User from "../models/User";

const create = publicProcedure
  .input(
    z.object({
      firstName: z.string(),
      lastName: z.string(),
      phoneNumber: z.string(),
      dateOfBirth: z.date(),
    })
  )
  .mutation(async ({ input }) => {
    const user = await User.query().insert({
      firstName: input.firstName,
      lastName: input.lastName,
      phoneNumber: input.phoneNumber,
      dateOfBirth: input.dateOfBirth.toISOString(),
    });

    return user;
  });

export const userRouter = router({ create });
