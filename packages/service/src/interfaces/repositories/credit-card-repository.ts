import { CreditCardEntity } from "@/interfaces/entities";
import { PartialRequired } from "@/types";
import { CreateAccountParams, IAccountRepository, UpdateAccountParams } from "./account-repository";

export type CreateCreditCardParams = PartialRequired<CreateAccountParams, "serviceProvider"> & {
  limit: number;
};

export type UpdateCreditCardParams = UpdateAccountParams & {
  limit?: number;
};

export interface ICreditCardRepository
  extends IAccountRepository<CreditCardEntity, CreateCreditCardParams, UpdateCreditCardParams> {}
