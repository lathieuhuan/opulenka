import {
  AccountEntity,
  CreditCardEntity,
  InvestmentAccountEntity,
  SavingsAccountEntity,
} from "@/interfaces/entities";
import {
  CreateAccountParams,
  CreateCreditCardParams,
  CreateInvestmentAccountParams,
  CreateSavingsAccountParams,
  UpdateAccountParams,
  UpdateCreditCardParams,
  UpdateInvestmentAccountParams,
  UpdateSavingsAccountParams,
} from "@/interfaces/repositories";
import { ServiceResponse } from "./base-response";

// ===== ACCOUNT, CASH ACCOUNT, CHECKING ACCOUNT =====

export type CreateAccountRequest = CreateAccountParams;
export type CreateAccountResponse = ServiceResponse<AccountEntity>;

export type GetAccountRequest = {
  userId: number;
  id: number;
};
export type GetAccountResponse = ServiceResponse<AccountEntity>;

export type GetAccountsRequest = {
  userId: number;
};
export type GetAccountsResponse = ServiceResponse<AccountEntity[]>;

export type UpdateAccountRequest = {
  id: number;
  data: UpdateAccountParams;
};
export type UpdateAccountResponse = ServiceResponse<AccountEntity>;

export type DeleteAccountRequest = {
  id: number;
};
export type DeleteAccountResponse = ServiceResponse<null>;

// ===== CREDIT CARD =====

export type CreateCreditCardRequest = CreateCreditCardParams;
export type CreateCreditCardResponse = ServiceResponse<CreditCardEntity>;

export type GetCreditCardResponse = ServiceResponse<CreditCardEntity>;
export type GetCreditCardsResponse = ServiceResponse<CreditCardEntity[]>;

export type UpdateCreditCardRequest = {
  id: number;
  data: UpdateCreditCardParams;
};
export type UpdateCreditCardResponse = ServiceResponse<CreditCardEntity>;

// ===== INVESTMENT ACCOUNT =====

export type CreateInvestmentAccountRequest = CreateInvestmentAccountParams;
export type CreateInvestmentAccountResponse = ServiceResponse<InvestmentAccountEntity>;

export type GetInvestmentAccountResponse = ServiceResponse<InvestmentAccountEntity>;
export type GetInvestmentAccountsResponse = ServiceResponse<InvestmentAccountEntity[]>;

export type UpdateInvestmentAccountRequest = {
  id: number;
  data: UpdateInvestmentAccountParams;
};
export type UpdateInvestmentAccountResponse = ServiceResponse<InvestmentAccountEntity>;

// ===== SAVINGS ACCOUNT =====

export type CreateSavingsAccountRequest = CreateSavingsAccountParams;
export type CreateSavingsAccountResponse = ServiceResponse<SavingsAccountEntity>;

export type GetSavingsAccountResponse = ServiceResponse<SavingsAccountEntity>;
export type GetSavingsAccountsResponse = ServiceResponse<SavingsAccountEntity[]>;

export type UpdateSavingsAccountRequest = {
  id: number;
  data: UpdateSavingsAccountParams;
};
export type UpdateSavingsAccountResponse = ServiceResponse<SavingsAccountEntity>;
