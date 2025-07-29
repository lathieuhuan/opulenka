import { z } from "zod";
import { optionalString, requiredString } from "../schema-parts";
import { createAccountSchema, updateAccountSchema } from "./account-schemas";

export const createCheckingAccountSchema = createAccountSchema.extend({
  accountNumber: optionalString,
  serviceProvider: requiredString,
});

export const updateCheckingAccountSchema = updateAccountSchema.extend({
  accountNumber: optionalString,
  serviceProvider: optionalString,
});

export type CreateCheckingAccountSchema = z.infer<typeof createCheckingAccountSchema>;
export type UpdateCheckingAccountSchema = z.infer<typeof updateCheckingAccountSchema>;