import { useMutation } from "@tanstack/react-query";

import { createCashAccount } from "@/services/account-service";
import { CashAccountForm, CashAccountFormValues } from "../account-forms";
import { AccountFormProps } from "../types";

export function CashAccountCreateForm({ id, defaultErrorMsg, onStateChange }: AccountFormProps) {
  const { mutate: tryCreateAccount, isError } = useMutation({
    mutationFn: createCashAccount,
    onSuccess: () => {
      onStateChange("success");
    },
    onError: () => {
      onStateChange("error");
    },
  });

  const handleSubmit = (data: CashAccountFormValues) => {
    onStateChange("loading");
    tryCreateAccount(data);
  };

  return (
    <CashAccountForm
      id={id}
      onSubmit={handleSubmit}
      errorMsg={isError ? defaultErrorMsg : undefined}
    />
  );
}
