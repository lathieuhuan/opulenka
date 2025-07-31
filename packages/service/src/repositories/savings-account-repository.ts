import { eq } from "drizzle-orm";

import { AccountTable, SavingsAccountTable } from "@/db";
import { AccountEntity, SavingsAccountEntity } from "@/interfaces/entities";
import {
  CreateSavingsAccountParams,
  ISavingsAccountRepository,
  UpdateSavingsAccountParams,
} from "@/interfaces/repositories";
import { OmitNull } from "@/types";
import { omitNull } from "@/utils/omit-null";
import { AccountRepository } from "./account-repository";

export class SavingsAccountRepository
  extends AccountRepository
  implements ISavingsAccountRepository
{
  override async createAccount(params: CreateSavingsAccountParams): Promise<SavingsAccountEntity> {
    const baseAccount = await super.createAccount(params);

    const [account] = await this.db
      .insert(SavingsAccountTable)
      .values({
        accountId: baseAccount.id,
        interestRate: params.interestRate.toString(),
      })
      .returning();

    return this.toSavingsAccount(baseAccount, omitNull(account));
  }

  override async getAccountByUserIdAndId(
    userId: number,
    id: number,
  ): Promise<SavingsAccountEntity | null> {
    const baseAccount = await super.getAccountByUserIdAndId(userId, id);
    if (!baseAccount) return null;

    const [account] = await this.db
      .select()
      .from(SavingsAccountTable)
      .where(eq(SavingsAccountTable.accountId, id));
    const savingsAccount = omitNull(account);

    return this.toSavingsAccount(baseAccount, savingsAccount);
  }

  override async getAccountsByUserId(userId: number): Promise<SavingsAccountEntity[]> {
    const queryRecords = await this.db
      .select({
        accounts: AccountTable,
        savings_accounts: SavingsAccountTable,
      })
      .from(SavingsAccountTable)
      .innerJoin(AccountTable, eq(SavingsAccountTable.accountId, AccountTable.id))
      .where(eq(AccountTable.userId, userId));

    return queryRecords.map(({ accounts, savings_accounts }) =>
      this.toSavingsAccount(omitNull(accounts), omitNull(savings_accounts)),
    );
  }

  override async updateAccount(
    id: number,
    params: UpdateSavingsAccountParams,
  ): Promise<SavingsAccountEntity | null> {
    const baseAccount = await super.updateAccount(id, params);
    if (!baseAccount) return null;

    const [account] = await this.db
      .update(SavingsAccountTable)
      .set({
        interestRate: params.interestRate?.toString(),
      })
      .where(eq(SavingsAccountTable.accountId, id))
      .returning();

    return this.toSavingsAccount(baseAccount, omitNull(account));
  }

  override async deleteAccount(id: number): Promise<boolean> {
    const baseAccount = await super.deleteAccount(id);

    if (baseAccount) {
      const result = await this.db
        .delete(AccountTable)
        .where(eq(AccountTable.id, id))
        .returning({ id: AccountTable.id });

      return result.length > 0;
    }

    return false;
  }

  private toSavingsAccount(
    baseAccount: AccountEntity,
    savingsAccount: OmitNull<typeof SavingsAccountTable.$inferSelect>,
  ) {
    return {
      id: baseAccount.id,
      name: baseAccount.name,
      userId: baseAccount.userId,
      status: baseAccount.status,
      type: baseAccount.type,
      accountNumber: baseAccount.accountNumber,
      serviceProvider: baseAccount.serviceProvider,
      description: baseAccount.description,
      initialBalance: baseAccount.initialBalance,
      balance: baseAccount.balance,
      currency: baseAccount.currency,
      createdAt: baseAccount.createdAt,
      interestRate: savingsAccount.interestRate,
    };
  }
}
