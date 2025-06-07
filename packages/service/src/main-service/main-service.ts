import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { UserRepository } from "../repositories/user-repository";
import { AuthService } from "../services/auth-service";
import { configureDatabase } from "./configure-database";

// type Database = NeonHttpDatabase & {
//   $client: NeonQueryFunction<false, false>;
// };

export class OpulenkaService {
  //
  private _sql: NeonQueryFunction<false, false> | undefined;

  authService: AuthService;

  constructor(connectionString: string) {
    this._sql = neon(connectionString);
    const db = drizzle(this._sql);

    const userRepo = new UserRepository(db);

    this.authService = new AuthService(userRepo);
  }

  private get sql() {
    if (!this._sql) {
      throw new Error("Database is not initialized");
    }
    return this._sql;
  }

  async configureDatabase() {
    await configureDatabase(this.sql);
  }
}
