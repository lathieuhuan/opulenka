import { EAccountType, ECurrency } from "@opulenka/service";

export const accountTypeMap: Record<EAccountType, string> = {
  [EAccountType.CASH]: "cashAccount",
  [EAccountType.CHECKING]: "checkingAccount",
  [EAccountType.SAVINGS]: "savingsAccount",
  [EAccountType.CREDIT_CARD]: "creditCard",
  [EAccountType.INVESTMENT]: "investmentAccount",
};

export const currencyMap: Record<ECurrency, string> = {
  [ECurrency.USD]: "USD",
  [ECurrency.VND]: "VND",
};
