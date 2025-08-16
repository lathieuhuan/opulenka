import { ETransactionType } from "@/constants/enums";
import { TransactionEntity } from "../entities";
import { PaginationParams } from "../common";

export interface CreateTransactionParams {
  accountId: number;
  type: ETransactionType;
  amount: number;
  receiveAccountId?: number;
  description?: string;
  fee?: number;
}

export interface UpdateTransactionParams {
  amount?: number;
  description?: string;
  fee?: number;
}

export interface GetTransactionsParams extends PaginationParams {
  accountId?: number;
  search?: string;
  type?: ETransactionType;
  createdFrom?: Date;
  createdTo?: Date;
}

export interface ITransactionRepository {
  createTransaction(params: CreateTransactionParams): Promise<TransactionEntity>;

  getTransactionById(id: number): Promise<TransactionEntity | null>;

  getTransactions(params: GetTransactionsParams): Promise<TransactionEntity[]>;

  updateTransaction(id: number, params: UpdateTransactionParams): Promise<TransactionEntity | null>;

  deleteTransaction(id: number): Promise<boolean>;
}
