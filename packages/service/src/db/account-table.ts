import { pgTable, serial, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { EAccountStatus, EAccountType, ECurrency } from "@/constants/enums";
import { UserTable } from "./user-table";

// CASH, CHECKING

export const AccountTable = pgTable("accounts", {
  id: serial("id").primaryKey().notNull(),
  userId: serial("user_id")
    .notNull()
    .references(() => UserTable.id),
  name: varchar("name", { length: 60 }).notNull(),
  status: varchar("status", { length: 1 })
    .$type<EAccountStatus>()
    .notNull()
    .default(EAccountStatus.ACTIVE),
  type: varchar("type", { length: 12 }).$type<EAccountType>().notNull(),
  accountNumber: varchar("account_number", { length: 20 }),
  serviceProvider: varchar("service_provider", { length: 30 }).notNull().default("N/A"),
  description: varchar("description", { length: 255 }),
  initialBalance: integer("initial_balance").notNull().default(0),
  balance: integer("balance").notNull().default(0),
  currency: varchar("currency", { length: 3 }).$type<ECurrency>().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
