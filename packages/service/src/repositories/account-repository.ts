import { and, eq } from "drizzle-orm";

import { AccountTable } from "@/db";
import { AccountEntity } from "@/interfaces/entities";
import {
  CreateAccountParams,
  IAccountRepository,
  UpdateAccountParams,
} from "@/interfaces/repositories";
import { omitNull } from "@/utils/omit-null";
import { BaseRepository } from "./base-repository";

export class AccountRepository extends BaseRepository implements IAccountRepository {
  async createAccount(params: CreateAccountParams): Promise<AccountEntity> {
    const [account] = await this.db
      .insert(AccountTable)
      .values({
        userId: params.userId,
        name: params.name,
        type: params.type,
        accountNumber: params.accountNumber,
        serviceProvider: params.serviceProvider,
        description: params.description,
        initialBalance: params.initialBalance ?? 0,
        balance: params.initialBalance ?? 0,
        currency: params.currency,
      })
      .returning();
    return omitNull(account);
  }

  async getAccountByUserIdAndId(userId: number, id: number): Promise<AccountEntity | null> {
    const [account] = await this.db
      .select()
      .from(AccountTable)
      .where(and(eq(AccountTable.id, id), eq(AccountTable.userId, userId)));
    return omitNull(account) || null;
  }

  async getAccountsByUserId(userId: number): Promise<AccountEntity[]> {
    return (await this.db.select().from(AccountTable).where(eq(AccountTable.userId, userId))).map(
      omitNull,
    );
  }

  async updateAccount(id: number, params: UpdateAccountParams): Promise<AccountEntity | null> {
    const [account] = await this.db
      .update(AccountTable)
      .set(params)
      .where(eq(AccountTable.id, id))
      .returning();
    return omitNull(account) || null;
  }

  async deleteAccount(id: number): Promise<boolean> {
    const result = await this.db
      .delete(AccountTable)
      .where(eq(AccountTable.id, id))
      .returning({ id: AccountTable.id });
    return result.length > 0;
  }
}
