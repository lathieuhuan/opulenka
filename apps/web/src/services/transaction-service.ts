import { isoStringFieldsToDate } from "@/lib/utils/converters";
import {
  CreateTransactionRequest,
  CreateTransactionResponse,
  DeleteTransactionResponse,
  GetTransactionByIdResponse,
  GetTransactionsRequest,
  GetTransactionsResponse,
  UpdateTransactionRequest,
  UpdateTransactionResponse,
} from "@opulenka/service";
import { http, RequestConfig } from "./base/http";

export type GetTransactionsParams = Pick<
  GetTransactionsRequest,
  "page" | "limit" | "search" | "type" | "createdFrom" | "createdTo"
>;

export function getTransactions(params: GetTransactionsParams, config?: RequestConfig) {
  return http
    .request<GetTransactionsResponse>("GET", "/transactions", {
      params,
      ...config,
    })
    .then((res) => res.data.map((item) => isoStringFieldsToDate(item, ["createdAt"])));
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
