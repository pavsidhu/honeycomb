import { subYears } from "date-fns";
import * as z from "zod";

export const MINIMUM_AGE = 18;
export const maxDateOfBirth = subYears(new Date(), MINIMUM_AGE);

export const onboardingSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  dateOfBirth: z.date().max(maxDateOfBirth),
});
export type OnboardingSchema = z.infer<typeof onboardingSchema>;
