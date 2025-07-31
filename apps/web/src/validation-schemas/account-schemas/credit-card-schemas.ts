import { z } from "zod";

import { ECurrency } from "@opulenka/service";
import { optionalNumber, optionalString, requiredNumber, requiredString } from "../schema-parts";

export const createCreditCardSchema = z.object({
  name: requiredString,
  serviceProvider: requiredString,
  accountNumber: optionalString,
  description: optionalString,
  initialBalance: requiredNumber,
  currency: z.nativeEnum(ECurrency),
  limit: requiredNumber,
});

export const updateCreditCardSchema = z.object({
  name: optionalString,
  serviceProvider: optionalString,
  accountNumber: optionalString,
  description: optionalString,
  limit: optionalNumber,
});

export type CreateCreditCardSchema = z.infer<typeof createCreditCardSchema>;
export type UpdateCreditCardSchema = z.infer<typeof updateCreditCardSchema>; 