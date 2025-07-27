import {
  CreateAccountRequest,
  CreateAccountResponse,
  DataOf,
  GetAccountResponse,
  GetAccountsResponse,
  UpdateAccountRequest,
  UpdateAccountResponse,
} from "@opulenka/service";
import { http, RequestConfig } from "./base/http";

export type AccountFromGetAccounts = DataOf<GetAccountsResponse>[number];

export function getAccounts(config?: RequestConfig) {
  return http.request<GetAccountsResponse>("GET", "/accounts", {
    ...config,
  });
}

// Cash Account

export function createCashAccount(
  req: Omit<CreateAccountRequest, "userId">,
  config?: RequestConfig,
) {
  return http.request<CreateAccountResponse>("POST", "/accounts/cash", {
    body: req,
    ...config,
  });
}

export function updateCashAccount(req: UpdateAccountRequest, config?: RequestConfig) {
  return http.request<UpdateAccountResponse>("PUT", `/accounts/cash/${req.id}`, {
    body: req.data,
    ...config,
  });
}

export function getCashAccountById(accountId: number, config?: RequestConfig) {
  return http.request<GetAccountResponse>("GET", `/accounts/cash/${accountId}`, {
    ...config,
  });
}

// Investment Account

export function createInvestmentAccount(
  req: Omit<CreateAccountRequest, "userId">,
  config?: RequestConfig,
) {
  return http.request<CreateAccountResponse>("POST", "/accounts/investment", {
    body: req,
    ...config,
  });
}

export function updateInvestmentAccount(req: UpdateAccountRequest, config?: RequestConfig) {
  return http.request<UpdateAccountResponse>("PUT", `/accounts/investment/${req.id}`, {
    body: req.data,
    ...config,
  });
}

export function getInvestmentAccountById(accountId: number, config?: RequestConfig) {
  return http.request<GetAccountResponse>("GET", `/accounts/investment/${accountId}`, {
    ...config,
  });
}
