import { UserTable } from "@/db";
import { OmitNull } from "@/types";

export type UserEntity = OmitNull<typeof UserTable.$inferSelect>;
