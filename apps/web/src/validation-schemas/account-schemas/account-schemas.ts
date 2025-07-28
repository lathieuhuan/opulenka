import { z } from "zod";

import { ECurrency } from "@opulenka/service";
import { optionalString, requiredNumber, requiredString } from "../schema-parts";

export const createAccountSchema = z.object({
  name: requiredString,
  description: optionalString,
  initialBalance: requiredNumber,
  currency: z.nativeEnum(ECurrency),
});

export const updateAccountSchema = z.object({
  name: optionalString,
  description: optionalString,
});

export type CreateAccountSchema = z.infer<typeof createAccountSchema>;
export type UpdateAccountSchema = z.infer<typeof updateAccountSchema>;
