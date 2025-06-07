import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/*.ts",
  out: "./src/migrations",
  // dbCredentials: {
  //   url: process.env.DATABASE_URL!,
  // },
});
