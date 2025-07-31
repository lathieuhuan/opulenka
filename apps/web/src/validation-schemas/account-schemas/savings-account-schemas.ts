import { z } from "zod";
import { optionalString, requiredString, requiredNumber, optionalNumber } from "../schema-parts";
import { createAccountSchema, updateAccountSchema } from "./account-schemas";

export const createSavingsAccountSchema = createAccountSchema.extend({
  accountNumber: optionalString,
  serviceProvider: requiredString,
  interestRate: requiredNumber,
});

export const updateSavingsAccountSchema = updateAccountSchema.extend({
  accountNumber: optionalString,
  serviceProvider: optionalString,
  interestRate: optionalNumber,
});

export type CreateSavingsAccountSchema = z.infer<typeof createSavingsAccountSchema>;
export type UpdateSavingsAccountSchema = z.infer<typeof updateSavingsAccountSchema>; 