import { AccountEntity } from "@/interfaces/entities";
import { EAccountStatus, EAccountType, ECurrency } from "@/constants/enums";

export type CreateAccountParams = {
  userId: number;
  name: string;
  type: EAccountType;
  description?: string;
  initialBalance?: number;
  currency: ECurrency;
  accountNumber?: string;
  serviceProvider?: string;
};

export type UpdateAccountParams = Partial<{
  name: string;
  status: EAccountStatus;
  type: EAccountType;
  description: string | null;
  balance: number;
  currency: ECurrency;
  accountNumber: string;
  serviceProvider: string;
}>;

export interface IAccountRepository {
  //
  createAccount(params: CreateAccountParams): Promise<AccountEntity>;

  getAccountById(id: number): Promise<AccountEntity | null>;

  getAccountsByUserId(userId: number): Promise<AccountEntity[]>;

  updateAccount(id: number, params: UpdateAccountParams): Promise<AccountEntity | null>;

  deleteAccount(id: number): Promise<boolean>;
}
