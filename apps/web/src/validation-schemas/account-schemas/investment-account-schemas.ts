import { z } from "zod";
import { optionalString, requiredString } from "../schema-parts";
import { createAccountSchema, updateAccountSchema } from "./account-schemas";

export const createInvestmentAccountSchema = createAccountSchema.extend({
  accountNumber: optionalString,
  serviceProvider: requiredString,
});

export const updateInvestmentAccountSchema = updateAccountSchema.extend({
  accountNumber: optionalString,
  serviceProvider: optionalString,
});

export type CreateInvestmentAccountSchema = z.infer<typeof createInvestmentAccountSchema>;
export type UpdateInvestmentAccountSchema = z.infer<typeof updateInvestmentAccountSchema>;