import { UsersTable } from "@/db";
import { OmitNull } from "@/types";

export type UserEntity = OmitNull<typeof UsersTable.$inferSelect>;
