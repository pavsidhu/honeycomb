import { subYears } from "date-fns";
import { z } from "zod";

import User from "../models/User";
import { router, publicProcedure } from "../trpc";

const MINIMUM_AGE = 18;
const maxDateOfBirth = subYears(new Date(), MINIMUM_AGE);

const getUserByIdSchema = z.object({ id: z.string() });
const getUserById = publicProcedure
  .input(getUserByIdSchema)
  .mutation(({ input }) => {
    return User.query().where({ id: input.id }).first();
  });

const createUserSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  phoneNumber: z.string().trim(),
  dateOfBirth: z.date().max(maxDateOfBirth),
});
const createUser = publicProcedure
  .input(createUserSchema)
  .mutation(async ({ input }) => {
    // Handle existing phoneNumber

    try {
      return User.query().insert({
        firstName: input.firstName,
        lastName: input.lastName,
        phoneNumber: input.phoneNumber,
        dateOfBirth: input.dateOfBirth.toISOString(),
      });
    } catch (error) {
      // Handle non unqiue phone number
    }
  });

const updateUserSchema = z.object({
  id: z.string(),
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
  phoneNumber: z.string().trim().optional(),
  dateOfBirth: z.date().max(maxDateOfBirth).optional(),
});
const updateUser = publicProcedure
  .input(updateUserSchema)
  .mutation(({ input }) => {
    // Handle existing phoneNumber

    try {
      return User.query()
        .update({
          ...(input.firstName && { firstName: input.firstName }),
          ...(input.lastName && { lastName: input.lastName }),
          ...(input.phoneNumber && { phoneNumber: input.phoneNumber }),
          ...(input.dateOfBirth && {
            dateOfBirth: input.dateOfBirth.toISOString(),
          }),
        })
        .where({ id: input.id });
    } catch (error) {
      // Handle non unqiue phone number
    }
  });

const deleteUserSchema = z.object({ id: z.string() });
const deleteUser = publicProcedure
  .input(deleteUserSchema)
  .mutation(({ input }) => {
    return User.query().delete().where({ id: input.id });
  });

export const userRouter = router({
  getUserById,
  createUser,
  updateUser,
  deleteUser,
});
