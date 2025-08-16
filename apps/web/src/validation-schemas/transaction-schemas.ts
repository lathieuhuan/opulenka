import { z } from "zod";

import { ESortOrder, ETransactionType } from "@opulenka/service";
import {
  optionalDate,
  optionalEnum,
  optionalNumber,
  optionalString,
  requiredNumber,
} from "./schema-parts";

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
  search: optionalString,
  accountId: optionalNumber,
  type: optionalEnum(ETransactionType),
  page: optionalNumber,
  limit: optionalNumber,
  sortBy: optionalString,
  sortOrder: optionalEnum(ESortOrder),
  createdFrom: optionalDate,
  createdTo: optionalDate,
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
export type UpdateTransactionSchema = z.infer<typeof updateTransactionSchema>;
export type GetTransactionsSchema = z.infer<typeof getTransactionsSchema>;
