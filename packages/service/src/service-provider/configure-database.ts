import type { NeonQueryFunction } from "@neondatabase/serverless";

export async function configureDatabase(sql: NeonQueryFunction<false, false>) {
  // Create users table
  await sql`CREATE TABLE IF NOT EXISTS "users" (
    "id" serial PRIMARY KEY NOT NULL,
    "email" varchar(64) NOT NULL,
    "password" text NOT NULL,
    "username" varchar(24),
    "joined_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "users_email_unique" UNIQUE("email")
  )`;

  // Create accounts table
  await sql`CREATE TABLE IF NOT EXISTS "accounts" (
    "id" serial PRIMARY KEY NOT NULL,
    "user_id" serial NOT NULL,
    "name" varchar(60) NOT NULL,
    "status" varchar(1) DEFAULT 'A' NOT NULL,
    "type" varchar(12) NOT NULL,
    "account_number" varchar(20),
    "service_provider" varchar(30) DEFAULT 'N/A' NOT NULL,
    "description" varchar(255),
    "initial_balance" integer DEFAULT 0 NOT NULL,
    "balance" integer DEFAULT 0 NOT NULL,
    "currency" varchar(3) NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
  )`;

  // Create credit_cards table
  await sql`CREATE TABLE IF NOT EXISTS "credit_cards" (
    "id" serial PRIMARY KEY NOT NULL,
    "account_id" serial NOT NULL,
    "limit" integer DEFAULT 0 NOT NULL
  )`;

  // Create investment_accounts table
  await sql`CREATE TABLE IF NOT EXISTS "investment_accounts" (
    "id" serial PRIMARY KEY NOT NULL,
    "account_id" serial NOT NULL
  )`;

  // Create savings_accounts table
  await sql`CREATE TABLE IF NOT EXISTS "savings_accounts" (
    "id" serial PRIMARY KEY NOT NULL,
    "account_id" serial NOT NULL,
    "interest_rate" numeric(5, 2) DEFAULT '0' NOT NULL
  )`;

  // Create transactions table
  await sql`CREATE TABLE IF NOT EXISTS "transactions" (
    "id" serial PRIMARY KEY NOT NULL,
    "account_id" serial NOT NULL,
    "type" varchar(12) NOT NULL,
    "amount" integer NOT NULL,
    "linked_transaction_id" integer,
    "description" varchar(255),
    "created_at" timestamp DEFAULT now() NOT NULL,
    "fee" integer,
    "deleted" boolean DEFAULT false NOT NULL
  )`;

  // Add foreign key constraints (using DO blocks to make them idempotent)
  await sql`DO $$ BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'accounts_user_id_users_id_fk'
    ) THEN
      ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" 
      FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
    END IF;
  END $$`;

  await sql`DO $$ BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'credit_cards_account_id_accounts_id_fk'
    ) THEN
      ALTER TABLE "credit_cards" ADD CONSTRAINT "credit_cards_account_id_accounts_id_fk" 
      FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;
    END IF;
  END $$`;

  await sql`DO $$ BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'investment_accounts_account_id_accounts_id_fk'
    ) THEN
      ALTER TABLE "investment_accounts" ADD CONSTRAINT "investment_accounts_account_id_accounts_id_fk" 
      FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;
    END IF;
  END $$`;

  await sql`DO $$ BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'savings_accounts_account_id_accounts_id_fk'
    ) THEN
      ALTER TABLE "savings_accounts" ADD CONSTRAINT "savings_accounts_account_id_accounts_id_fk" 
      FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;
    END IF;
  END $$`;

  await sql`DO $$ BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'transactions_account_id_accounts_id_fk'
    ) THEN
      ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_accounts_id_fk" 
      FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE no action ON UPDATE no action;
    END IF;
  END $$`;

  await sql`DO $$ BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'transactions_linked_transaction_id_transactions_id_fk'
    ) THEN
      ALTER TABLE "transactions" ADD CONSTRAINT "transactions_linked_transaction_id_transactions_id_fk" 
      FOREIGN KEY ("linked_transaction_id") REFERENCES "public"."transactions"("id") ON DELETE no action ON UPDATE no action;
    END IF;
  END $$`;

  // Create indexes
  await sql`CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" USING btree ("email")`;
}
