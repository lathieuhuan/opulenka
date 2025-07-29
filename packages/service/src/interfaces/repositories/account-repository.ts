import { AccountEntity } from "@/interfaces/entities";
import { EAccountStatus, EAccountType, ECurrency } from "@/constants/enums";

export type CreateAccountParams = {
  userId: number;
  name: string;
  type: EAccountType;
  accountNumber?: string;
  serviceProvider?: string;
  description?: string;
  initialBalance?: number;
  currency: ECurrency;
};

export type UpdateAccountParams = Partial<{
  name: string;
  status: EAccountStatus;
  accountNumber: string;
  serviceProvider: string;
  description: string;
  initialBalance: number;
}>;

export interface IAccountRepository<
  TAccount extends AccountEntity = AccountEntity,
  TCreateParams extends CreateAccountParams = CreateAccountParams,
  TUpdateParams extends UpdateAccountParams = UpdateAccountParams,
> {
  //
  createAccount(params: TCreateParams): Promise<TAccount>;

  getAccountByUserIdAndId(userId: number, id: number): Promise<TAccount | null>;

  getAccountsByUserId(userId: number): Promise<TAccount[]>;

  updateAccount(id: number, params: TUpdateParams): Promise<TAccount | null>;

  deleteAccount(id: number): Promise<boolean>;
}
