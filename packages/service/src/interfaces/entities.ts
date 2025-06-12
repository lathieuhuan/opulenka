import { AccountTable, TransactionTable, UserTable } from "@/db";

export type UserEntity = typeof UserTable.$inferSelect;

export type AccountEntity = typeof AccountTable.$inferSelect;

export type TransactionEntity = typeof TransactionTable.$inferSelect;
