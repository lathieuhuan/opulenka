import { TransactionEntity } from "../entities";
import {
  CreateTransactionParams,
  GetTransactionsParams,
  UpdateTransactionParams,
} from "../repositories";
import { ServiceResponse } from "./base-response";

export type CreateTransactionRequest = CreateTransactionParams;
export type CreateTransactionResponse = ServiceResponse<TransactionEntity>;

export type GetTransactionByIdRequest = {
  id: number;
};
export type GetTransactionByIdResponse = ServiceResponse<TransactionEntity>;

export type GetTransactionsRequest = GetTransactionsParams;
export type GetTransactionsResponse = ServiceResponse<TransactionEntity[]>;

export type UpdateTransactionRequest = {
  id: number;
  data: UpdateTransactionParams;
};
export type UpdateTransactionResponse = ServiceResponse<TransactionEntity>;

export type DeleteTransactionRequest = {
  id: number;
};
export type DeleteTransactionResponse = ServiceResponse<null>;
