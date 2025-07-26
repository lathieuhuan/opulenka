import { pgTable, serial } from "drizzle-orm/pg-core";
import { AccountTable } from "./account-table";

export const InvestmentAccountTable = pgTable("investment_accounts", {
  id: serial("id").primaryKey().notNull(),
  accountId: serial("account_id")
    .notNull()
    .references(() => AccountTable.id),
});
