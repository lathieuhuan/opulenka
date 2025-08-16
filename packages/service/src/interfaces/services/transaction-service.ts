import { TransactionEntity } from "../entities";
import {
  CreateTransactionParams,
  GetTransactionsParams,
  UpdateTransactionParams,
} from "../repositories";
import { ServiceResponse } from "./base-response";

// CREATE

export type CreateTransactionRequest = CreateTransactionParams;

export type CreateTransactionResponse = ServiceResponse<TransactionEntity>;

// READ

export type GetTransactionByIdRequest = {
  id: number;
};
export type GetTransactionByIdResponse = ServiceResponse<TransactionEntity>;

export type GetTransactionsRequest = GetTransactionsParams;

export type TransactionDTO = Omit<TransactionEntity, "account">;

export type GetTransactionsResponse = ServiceResponse<TransactionDTO[]>;

// UPDATE

export type UpdateTransactionRequest = {
  id: number;
  data: UpdateTransactionParams;
};

export type UpdateTransactionResponse = ServiceResponse<TransactionEntity>;

// DELETE

export type DeleteTransactionRequest = {
  id: number;
};

export type DeleteTransactionResponse = ServiceResponse<null>;
