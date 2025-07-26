import { SavingsAccountEntity } from "@/interfaces/entities";
import { PartialRequired } from "@/types";
import { CreateAccountParams, IAccountRepository, UpdateAccountParams } from "./account-repository";

export type CreateSavingsAccountParams = PartialRequired<CreateAccountParams, "serviceProvider"> & {
  interestRate: number;
};

export type UpdateSavingsAccountParams = UpdateAccountParams & {
  interestRate?: number;
};

export interface ISavingsAccountRepository
  extends IAccountRepository<
    SavingsAccountEntity,
    CreateSavingsAccountParams,
    UpdateSavingsAccountParams
  > {}
