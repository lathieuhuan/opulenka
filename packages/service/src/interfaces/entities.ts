import { UsersTable } from "@/db";

export type UserEntity = typeof UsersTable.$inferSelect;
