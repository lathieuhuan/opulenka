import {
  CreateTransactionRequest,
  CreateTransactionResponse,
  GetTransactionByIdResponse,
  GetTransactionsRequest,
  GetTransactionsResponse,
  UpdateTransactionRequest,
  UpdateTransactionResponse,
  DeleteTransactionResponse,
  DataOf,
} from "@opulenka/service";
import { http, RequestConfig } from "./base/http";

export type TransactionFromGetTransactions = DataOf<GetTransactionsResponse>[number];

export function getTransactions(params?: GetTransactionsRequest, config?: RequestConfig) {
  return http.request<GetTransactionsResponse>("GET", "/transactions", {
    params,
    ...config,
  });
}

export function createTransaction(req: CreateTransactionRequest, config?: RequestConfig) {
  return http.request<CreateTransactionResponse>("POST", "/transactions", {
    body: req,
    ...config,
  });
}

export function getTransactionById(transactionId: number, config?: RequestConfig) {
  return http.request<GetTransactionByIdResponse>("GET", `/transactions/${transactionId}`, {
    ...config,
  });
}

export function updateTransaction(req: UpdateTransactionRequest, config?: RequestConfig) {
  return http.request<UpdateTransactionResponse>("PUT", `/transactions/${req.id}`, {
    body: req.data,
    ...config,
  });
}

export function deleteTransaction(transactionId: number, config?: RequestConfig) {
  return http.request<DeleteTransactionResponse>("DELETE", `/transactions/${transactionId}`, {
    ...config,
  });
}
