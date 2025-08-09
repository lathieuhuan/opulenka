import { z } from "zod";

import { ESortOrder, ETransactionType } from "@opulenka/service";
import { optionalNumber, optionalString, requiredNumber } from "./schema-parts";

export const createTransactionSchema = z.object({
  accountId: requiredNumber,
  type: z.nativeEnum(ETransactionType),
  amount: requiredNumber,
  receiveAccountId: optionalNumber,
  description: optionalString,
  fee: optionalNumber,
});

export const updateTransactionSchema = z.object({
  amount: optionalNumber,
  description: optionalString,
  fee: optionalNumber,
});

export const getTransactionsSchema = z.object({
  accountId: optionalNumber,
  page: optionalNumber,
  limit: optionalNumber,
  sortBy: optionalString,
  sortOrder: z.nativeEnum(ESortOrder).optional(),
  search: optionalString,
  // TODO: add date range
  // startDate: optionalString,
  // endDate: optionalString,
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionSchema = z.infer<typeof updateTransactionSchema>;
export type GetTransactionsSchema = z.infer<typeof getTransactionsSchema>;
