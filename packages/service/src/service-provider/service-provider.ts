import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { configureDatabase } from "./configure-database";

import { AccountRepository } from "@/repositories/account-repository";
import { CreditCardRepository } from "@/repositories/credit-card-repository";
import { InvestmentAccountRepository } from "@/repositories/investment-account-repository";
import { SavingsAccountRepository } from "@/repositories/savings-account-repository";
import { UserRepository } from "@/repositories/user-repository";
import { AccountService } from "@/services/account-service";
import { AuthService } from "@/services/auth-service";

// type Database = NeonHttpDatabase & {
//   $client: NeonQueryFunction<false, false>;
// };

export class ServiceProvider {
  //
  private _sql: NeonQueryFunction<false, false> | undefined;

  authService: AuthService;
  accountService: AccountService;

  constructor(connectionString: string) {
    this._sql = neon(connectionString);
    const db = drizzle(this._sql);

    const userRepo = new UserRepository(db);
    const accountRepo = new AccountRepository(db);
    const creditCardRepo = new CreditCardRepository(db);
    const investmentAccountRepo = new InvestmentAccountRepository(db);
    const savingsAccountRepo = new SavingsAccountRepository(db);

    this.authService = new AuthService(userRepo);
    this.accountService = new AccountService(
      accountRepo,
      creditCardRepo,
      investmentAccountRepo,
      savingsAccountRepo,
    );
  }

  private get sql() {
    if (!this._sql) {
      throw new Error("Database is not initialized");
    }
    return this._sql;
  }

  get service() {
    return {
      auth: this.authService,
      account: this.accountService,
    };
  }

  async configureDatabase() {
    await configureDatabase(this.sql);
  }
}
