import { InvestmentAccountEntity } from "@/interfaces/entities";
import { PartialRequired } from "@/types";
import { CreateAccountParams, IAccountRepository, UpdateAccountParams } from "./account-repository";

export type CreateInvestmentAccountParams = PartialRequired<CreateAccountParams, "serviceProvider">;

export type UpdateInvestmentAccountParams = UpdateAccountParams;

export interface IInvestmentAccountRepository
  extends IAccountRepository<
    InvestmentAccountEntity,
    CreateInvestmentAccountParams,
    UpdateInvestmentAccountParams
  > {}
