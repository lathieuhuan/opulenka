import { useMutation } from "@tanstack/react-query";

import { createCheckingAccount } from "@/services/account-service";
import { CheckingAccountForm, CheckingAccountFormValues } from "../account-forms";
import { AccountFormProps } from "../types";

export function CheckingAccountCreateForm({ id, defaultErrorMsg, onStateChange }: AccountFormProps) {
  const { mutate: tryCreateAccount, isError } = useMutation({
    mutationFn: createCheckingAccount,
    onSuccess: () => {
      onStateChange("success");
    },
    onError: () => {
      onStateChange("error");
    },
  });

  const handleSubmit = (data: CheckingAccountFormValues) => {
    onStateChange("loading");
    tryCreateAccount(data);
  };

  return (
    <CheckingAccountForm
      id={id}
      onSubmit={handleSubmit}
      errorMsg={isError ? defaultErrorMsg : undefined}
    />
  );
} 