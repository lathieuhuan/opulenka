import {
  AccountTable,
  UserTable,
  InvestmentAccountTable,
  CreditCardTable,
  SavingsAccountTable,
  TransactionTable,
} from "@/db";
import { OmitNull } from "@/types";

type ExtendAccount<T extends object> = AccountEntity & OmitNull<Omit<T, "accountId">>;

export type UserEntity = OmitNull<typeof UserTable.$inferSelect>;

export type AccountEntity = OmitNull<typeof AccountTable.$inferSelect>;

export type CreditCardEntity = ExtendAccount<typeof CreditCardTable.$inferSelect>;

export type SavingsAccountEntity = ExtendAccount<typeof SavingsAccountTable.$inferSelect>;

export type InvestmentAccountEntity = ExtendAccount<typeof InvestmentAccountTable.$inferSelect>;

export type TransactionEntity = OmitNull<typeof TransactionTable.$inferSelect>;