import { and, asc, desc, eq, gte, ilike, lte, or } from "drizzle-orm";

import { ESortOrder } from "@/constants/enums";
import { TransactionTable } from "@/db";
import { TransactionEntity } from "@/interfaces/entities";
import {
  CreateTransactionParams,
  GetTransactionsParams,
  ITransactionRepository,
  UpdateTransactionParams,
} from "@/interfaces/repositories";
import { omitNull } from "@/utils/omit-null";
import { BaseRepository } from "./base-repository";

export class TransactionRepository extends BaseRepository implements ITransactionRepository {
  async createTransaction(params: CreateTransactionParams): Promise<TransactionEntity> {
    const [transaction] = await this.db
      .insert(TransactionTable)
      .values({
        accountId: params.accountId,
        type: params.type,
        amount: params.amount,
        linkedTransactionId: params.receiveAccountId,
        description: params.description,
        fee: params.fee,
      })
      .returning();
    return omitNull(transaction);
  }

  async getTransactionById(id: number): Promise<TransactionEntity | null> {
    const [transaction] = await this.db
      .select()
      .from(TransactionTable)
      .where(and(eq(TransactionTable.id, id), eq(TransactionTable.deleted, false)));
    return omitNull(transaction) || null;
  }

  async getTransactions(params: GetTransactionsParams): Promise<TransactionEntity[]> {
    const {
      accountId,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = ESortOrder.DESC,
      search,
      startDate,
      endDate,
    } = params;

    // Build where conditions
    const whereConditions = [eq(TransactionTable.deleted, false)];

    if (accountId) {
      whereConditions.push(eq(TransactionTable.accountId, accountId));
    }

    // Add search filter
    if (search) {
      whereConditions.push(
        or(
          ilike(TransactionTable.description, `%${search}%`),
          ilike(TransactionTable.type, `%${search}%`),
        )!,
      );
    }

    // Add date range filters
    if (startDate) {
      whereConditions.push(gte(TransactionTable.createdAt, startDate));
    }

    if (endDate) {
      whereConditions.push(lte(TransactionTable.createdAt, endDate));
    }

    // Add sorting
    const orderBy = sortOrder === ESortOrder.ASC ? asc : desc;
    const sortField =
      sortBy === "createdAt"
        ? TransactionTable.createdAt
        : sortBy === "amount"
          ? TransactionTable.amount
          : TransactionTable.createdAt;

    // Add pagination
    const offset = (page - 1) * limit;

    const transactions = await this.db
      .select()
      .from(TransactionTable)
      .where(and(...whereConditions))
      .orderBy(orderBy(sortField))
      .limit(limit)
      .offset(offset);

    return transactions.map(omitNull);
  }

  async updateTransaction(
    id: number,
    params: UpdateTransactionParams,
  ): Promise<TransactionEntity | null> {
    const [transaction] = await this.db
      .update(TransactionTable)
      .set(params)
      .where(and(eq(TransactionTable.id, id), eq(TransactionTable.deleted, false)))
      .returning();
    return omitNull(transaction) || null;
  }

  async deleteTransaction(id: number): Promise<boolean> {
    const [transaction] = await this.db
      .update(TransactionTable)
      .set({ deleted: true })
      .where(and(eq(TransactionTable.id, id), eq(TransactionTable.deleted, false)))
      .returning();
    return !!transaction;
  }
}
