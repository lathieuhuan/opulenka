import type { NeonQueryFunction } from "@neondatabase/serverless";

export async function configureDatabase(sql: NeonQueryFunction<false, false>) {
  //
  await sql`CREATE TABLE IF NOT EXISTS "users" (
    "id" serial PRIMARY KEY NOT NULL,
    "email" varchar(64) NOT NULL,
    "password" text NOT NULL,
    "username" varchar(24),
    "joined_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "users_email_unique" UNIQUE("email")
  )`;

  await sql`CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" USING btree ("email")`;
}
