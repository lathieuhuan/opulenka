import {
  CreateAccountRequest,
  CreateAccountResponse,
  CreateCreditCardRequest,
  CreateCreditCardResponse,
  UpdateCreditCardRequest,
  UpdateCreditCardResponse,
  GetCreditCardResponse,
  CreateInvestmentAccountRequest,
  CreateInvestmentAccountResponse,
  UpdateInvestmentAccountRequest,
  UpdateInvestmentAccountResponse,
  CreateSavingsAccountRequest,
  CreateSavingsAccountResponse,
  UpdateSavingsAccountRequest,
  UpdateSavingsAccountResponse,
  GetSavingsAccountResponse,
  DataOf,
  GetAccountByIdResponse,
  GetAccountsResponse,
  UpdateAccountRequest,
  UpdateAccountResponse,
  Decimal,
} from "@opulenka/service";
import { http, RequestConfig } from "./base/http";

export type AccountFromGetAccounts = DataOf<GetAccountsResponse>[number];

export function getAccounts(config?: RequestConfig) {
  return http.request<GetAccountsResponse>("GET", "/accounts", {
    ...config,
  });
}

type OmittedCreateProps = "userId" | "type";

// Cash Account

export function createCashAccount(
  req: Omit<CreateAccountRequest, OmittedCreateProps>,
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
  return http.request<GetAccountByIdResponse>("GET", `/accounts/cash/${accountId}`, {
    ...config,
  });
}

// Checking Account

export function createCheckingAccount(
  req: Omit<CreateAccountRequest, OmittedCreateProps>,
  config?: RequestConfig,
) {
  return http.request<CreateAccountResponse>("POST", "/accounts/checking", {
    body: req,
    ...config,
  });
}

export function updateCheckingAccount(req: UpdateAccountRequest, config?: RequestConfig) {
  return http.request<UpdateAccountResponse>("PUT", `/accounts/checking/${req.id}`, {
    body: req.data,
    ...config,
  });
}

export function getCheckingAccountById(accountId: number, config?: RequestConfig) {
  return http.request<GetAccountByIdResponse>("GET", `/accounts/checking/${accountId}`, {
    ...config,
  });
}

// Credit Card Account

export function createCreditCard(
  req: Omit<CreateCreditCardRequest, OmittedCreateProps>,
  config?: RequestConfig,
) {
  return http.request<CreateCreditCardResponse>("POST", "/accounts/credit-card", {
    body: req,
    ...config,
  });
}

export function updateCreditCard(req: UpdateCreditCardRequest, config?: RequestConfig) {
  return http.request<UpdateCreditCardResponse>("PUT", `/accounts/credit-card/${req.id}`, {
    body: req.data,
    ...config,
  });
}

export function getCreditCardById(accountId: number, config?: RequestConfig) {
  return http.request<GetCreditCardResponse>("GET", `/accounts/credit-card/${accountId}`, {
    ...config,
  });
}

// Investment Account

export function createInvestmentAccount(
  req: Omit<CreateInvestmentAccountRequest, OmittedCreateProps>,
  config?: RequestConfig,
) {
  return http.request<CreateInvestmentAccountResponse>("POST", "/accounts/investment", {
    body: req,
    ...config,
  });
}

export function updateInvestmentAccount(
  req: UpdateInvestmentAccountRequest,
  config?: RequestConfig,
) {
  return http.request<UpdateInvestmentAccountResponse>("PUT", `/accounts/investment/${req.id}`, {
    body: req.data,
    ...config,
  });
}

export function getInvestmentAccountById(accountId: number, config?: RequestConfig) {
  return http.request<GetAccountByIdResponse>("GET", `/accounts/investment/${accountId}`, config);
}

// Savings Account

export function createSavingsAccount(
  req: Omit<CreateSavingsAccountRequest, OmittedCreateProps>,
  config?: RequestConfig,
) {
  return http.request<CreateSavingsAccountResponse>("POST", "/accounts/savings", {
    body: req,
    ...config,
  });
}

export function updateSavingsAccount(req: UpdateSavingsAccountRequest, config?: RequestConfig) {
  return http.request<UpdateSavingsAccountResponse>("PUT", `/accounts/savings/${req.id}`, {
    body: req.data,
    ...config,
  });
}

export function getSavingsAccountById(accountId: number, config?: RequestConfig) {
  return http
    .request<GetSavingsAccountResponse>("GET", `/accounts/savings/${accountId}`, config)
    .then((res) => {
      return {
        ...res,
        data: {
          ...res.data,
          interestRate: new Decimal(res.data.interestRate).toNumber(),
        },
      };
    });
}
