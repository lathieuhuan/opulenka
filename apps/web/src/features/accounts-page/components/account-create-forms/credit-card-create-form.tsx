import { useMutation } from "@tanstack/react-query";

import { createCreditCard } from "@/services/account-service";
import { CreditCardForm, CreditCardFormValues } from "../account-forms";
import { AccountFormProps } from "../types";

export function CreditCardCreateForm({ id, defaultErrorMsg, onStateChange }: AccountFormProps) {
  const { mutate: tryCreateAccount, isError } = useMutation({
    mutationFn: createCreditCard,
    onSuccess: () => {
      onStateChange("success");
    },
    onError: () => {
      onStateChange("error");
    },
  });

  const handleSubmit = (data: CreditCardFormValues) => {
    onStateChange("loading");
    tryCreateAccount(data);
  };

  return (
    <CreditCardForm
      id={id}
      onSubmit={handleSubmit}
      errorMsg={isError ? defaultErrorMsg : undefined}
    />
  );
} 