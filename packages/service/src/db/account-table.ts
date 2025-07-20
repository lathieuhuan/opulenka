import { pgTable, serial, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { EAccountStatus, EAccountType, ECurrency } from "@/constants/enums";
import { UserTable } from "./user-table";

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
  serviceProvider: varchar("service_provider", { length: 60 }),
  accountNumber: varchar("account_number", { length: 20 }).unique(),
  description: varchar("description", { length: 255 }),
  initialBalance: integer("initial_balance").notNull().default(0),
  balance: integer("balance").notNull().default(0),
  currency: varchar("currency", { length: 3 }).$type<ECurrency>().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
