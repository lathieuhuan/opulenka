import { useMutation } from "@tanstack/react-query";

import { createSavingsAccount } from "@/services/account-service";
import { SavingsAccountForm, SavingsAccountFormValues } from "../account-forms";
import { AccountFormProps } from "../types";

export function SavingsAccountCreateForm({ id, defaultErrorMsg, onStateChange }: AccountFormProps) {
  const { mutate: tryCreateAccount, isError } = useMutation({
    mutationFn: createSavingsAccount,
    onSuccess: () => {
      onStateChange("success");
    },
    onError: () => {
      onStateChange("error");
    },
  });

  const handleSubmit = (data: SavingsAccountFormValues) => {
    onStateChange("loading");
    tryCreateAccount(data);
  };

  return (
    <SavingsAccountForm
      id={id}
      onSubmit={handleSubmit}
      errorMsg={isError ? defaultErrorMsg : undefined}
    />
  );
} 