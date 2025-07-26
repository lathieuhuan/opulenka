import { eq } from "drizzle-orm";

import { AccountTable, CreditCardTable } from "@/db";
import { AccountEntity, CreditCardEntity } from "@/interfaces/entities";
import {
  CreateCreditCardParams,
  ICreditCardRepository,
  UpdateCreditCardParams,
} from "@/interfaces/repositories";
import { OmitNull } from "@/types";
import { omitNull } from "@/utils/omit-null";
import { AccountRepository } from "./account-repository";

export class CreditCardRepository extends AccountRepository implements ICreditCardRepository {
  override async createAccount(params: CreateCreditCardParams): Promise<CreditCardEntity> {
    const baseAccount = await super.createAccount(params);

    const [account] = await this.db
      .insert(CreditCardTable)
      .values({
        accountId: baseAccount.id,
        limit: params.limit,
      })
      .returning();

    return this.toCreditCard(baseAccount, omitNull(account));
  }

  override async getAccountByUserIdAndId(userId: number, id: number): Promise<CreditCardEntity | null> {
    const baseAccount = await super.getAccountByUserIdAndId(userId, id);
    if (!baseAccount) return null;

    const [account] = await this.db
      .select()
      .from(CreditCardTable)
      .where(eq(CreditCardTable.accountId, id));
    const creditCard = omitNull(account);

    return this.toCreditCard(baseAccount, creditCard);
  }

  override async getAccountsByUserId(userId: number): Promise<CreditCardEntity[]> {
    const queryRecords = await this.db
      .select({
        accounts: AccountTable,
        credit_cards: CreditCardTable,
      })
      .from(CreditCardTable)
      .innerJoin(AccountTable, eq(CreditCardTable.accountId, AccountTable.id))
      .where(eq(AccountTable.userId, userId));

    return queryRecords.map(({ accounts, credit_cards }) =>
      this.toCreditCard(omitNull(accounts), omitNull(credit_cards)),
    );
  }

  override async updateAccount(
    id: number,
    params: UpdateCreditCardParams,
  ): Promise<CreditCardEntity | null> {
    const baseAccount = await super.updateAccount(id, params);
    if (!baseAccount) return null;

    const [account] = await this.db
      .update(CreditCardTable)
      .set(params)
      .where(eq(CreditCardTable.accountId, id))
      .returning();

    return this.toCreditCard(baseAccount, omitNull(account));
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

  private toCreditCard(
    baseAccount: AccountEntity,
    creditCard: OmitNull<typeof CreditCardTable.$inferSelect>,
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
      limit: creditCard.limit,
    };
  }
}
