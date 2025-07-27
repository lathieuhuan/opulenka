import { EAccountType, ECurrency } from "@opulenka/service";

export const accountTypeMap: Record<EAccountType, string> = {
  [EAccountType.CASH]: "Cash Account",
  [EAccountType.CHECKING]: "Checking Account",
  [EAccountType.SAVINGS]: "Savings Account",
  [EAccountType.CREDIT_CARD]: "Credit Card",
  [EAccountType.INVESTMENT]: "Investment Account",
};

export const currencyMap: Record<ECurrency, string> = {
  [ECurrency.USD]: "USD",
  [ECurrency.VND]: "VND",
};
