import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { AccountTable } from "./account-table";

export const CreditCardTable = pgTable("credit_cards", {
  id: serial("id").primaryKey().notNull(),
  accountId: serial("account_id")
    .notNull()
    .references(() => AccountTable.id),
  limit: integer("limit").notNull().default(0),
});
