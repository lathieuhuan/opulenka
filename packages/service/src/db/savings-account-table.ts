import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { AccountTable } from "./account-table";

export const SavingsAccountTable = pgTable("savings_accounts", {
  id: serial("id").primaryKey().notNull(),
  accountId: serial("account_id")
    .notNull()
    .references(() => AccountTable.id),
  interestRate: integer("interest_rate").notNull().default(0),
});
