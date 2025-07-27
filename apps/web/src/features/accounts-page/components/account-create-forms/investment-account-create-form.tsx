import { useMutation } from "@tanstack/react-query";

import { createInvestmentAccount } from "@/services/account-service";
import { InvestmentAccountForm, InvestmentAccountFormValues } from "../account-forms";
import { AccountFormProps } from "../types";

export function InvestmentAccountCreateForm({ id, defaultErrorMsg, onStateChange }: AccountFormProps) {
  const { mutate: tryCreateAccount, isError } = useMutation({
    mutationFn: createInvestmentAccount,
    onSuccess: () => {
      onStateChange("success");
    },
    onError: () => {
      onStateChange("error");
    },
  });

  const handleSubmit = (data: InvestmentAccountFormValues) => {
    onStateChange("loading");
    tryCreateAccount(data);
  };

  return (
    <InvestmentAccountForm
      id={id}
      onSubmit={handleSubmit}
      errorMsg={isError ? defaultErrorMsg : undefined}
    />
  );
}
