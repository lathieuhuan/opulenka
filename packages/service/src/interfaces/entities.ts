import { AccountTable, UserTable } from "@/db";
import { OmitNull } from "@/types";

export type UserEntity = OmitNull<typeof UserTable.$inferSelect>;

export type AccountEntity = OmitNull<typeof AccountTable.$inferSelect>;
