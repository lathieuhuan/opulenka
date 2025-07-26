import { eq } from "drizzle-orm";

import { AccountTable, InvestmentAccountTable } from "@/db";
import { AccountEntity, InvestmentAccountEntity } from "@/interfaces/entities";
import {
  CreateInvestmentAccountParams,
  IInvestmentAccountRepository,
  UpdateInvestmentAccountParams,
} from "@/interfaces/repositories";
import { OmitNull } from "@/types";
import { omitNull } from "@/utils/omit-null";
import { AccountRepository } from "./account-repository";

export class InvestmentAccountRepository
  extends AccountRepository
  implements IInvestmentAccountRepository
{
  override async createAccount(
    params: CreateInvestmentAccountParams,
  ): Promise<InvestmentAccountEntity> {
    const baseAccount = await super.createAccount(params);

    const [account] = await this.db
      .insert(InvestmentAccountTable)
      .values({
        accountId: baseAccount.id,
      })
      .returning();

    return this.toInvestmentAccount(baseAccount, omitNull(account));
  }

  override async getAccountByUserIdAndId(
    userId: number,
    id: number,
  ): Promise<InvestmentAccountEntity | null> {
    const baseAccount = await super.getAccountByUserIdAndId(userId, id);
    if (!baseAccount) return null;

    const [account] = await this.db
      .select()
      .from(InvestmentAccountTable)
      .where(eq(InvestmentAccountTable.accountId, id));
    const investmentAccount = omitNull(account);

    return this.toInvestmentAccount(baseAccount, investmentAccount);
  }

  override async getAccountsByUserId(userId: number): Promise<InvestmentAccountEntity[]> {
    const queryRecords = await this.db
      .select({
        accounts: AccountTable,
        investment_accounts: InvestmentAccountTable,
      })
      .from(InvestmentAccountTable)
      .innerJoin(AccountTable, eq(InvestmentAccountTable.accountId, AccountTable.id))
      .where(eq(AccountTable.userId, userId));

    return queryRecords.map(({ accounts, investment_accounts }) =>
      this.toInvestmentAccount(omitNull(accounts), omitNull(investment_accounts)),
    );
  }

  override async updateAccount(
    id: number,
    params: UpdateInvestmentAccountParams,
  ): Promise<InvestmentAccountEntity | null> {
    const baseAccount = await super.updateAccount(id, params);
    if (!baseAccount) return null;

    const [account] = await this.db
      .update(InvestmentAccountTable)
      .set({})
      .where(eq(InvestmentAccountTable.accountId, id))
      .returning();

    return this.toInvestmentAccount(baseAccount, omitNull(account));
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

  private toInvestmentAccount(
    baseAccount: AccountEntity,
    investmentAccount: OmitNull<typeof InvestmentAccountTable.$inferSelect>,
  ) {
    return {
      id: baseAccount.id || investmentAccount.id,
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
    };
  }
}
