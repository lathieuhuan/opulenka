import {
  AnyPgColumn,
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { ETransactionType } from "@/constants/enums";
import { AccountTable } from "./account-table";

export const TransactionTable = pgTable("transactions", {
  id: serial("id").primaryKey().notNull(),
  accountId: serial("account_id")
    .notNull()
    .references(() => AccountTable.id),
  type: varchar("type", { length: 12 }).$type<ETransactionType>().notNull(),
  amount: integer("amount").notNull(),
  linkedTransactionId: integer("linked_transaction_id").references(
    (): AnyPgColumn => TransactionTable.id,
  ),
  description: varchar("description", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  fee: integer("fee"),
  deleted: boolean("deleted").notNull().default(false),
});
