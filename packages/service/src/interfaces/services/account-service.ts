import { AccountEntity } from "@/interfaces/entities";
import { CreateAccountParams, UpdateAccountParams } from "@/interfaces/repositories";
import { ServiceResponse } from "./base-response";

export type CreateAccountRequest = CreateAccountParams;
export type CreateAccountResponse = ServiceResponse<AccountEntity>;

export type GetAccountRequest = {
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