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

  await sql`CREATE TABLE IF NOT EXISTS "accounts" (
    "id" serial PRIMARY KEY NOT NULL,
    "user_id" serial NOT NULL,
    "name" varchar(60) NOT NULL,
    "status" varchar(1) DEFAULT 'A' NOT NULL,
    "type" varchar(12) NOT NULL,
    "service_provider" varchar(60),
    "account_number" varchar(20) UNIQUE,
    "description" varchar(255),
    "initial_balance" integer DEFAULT 0 NOT NULL,
    "balance" integer DEFAULT 0 NOT NULL,
    "currency" varchar(3) NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
  )`

  await sql`CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" USING btree ("email")`;
}
