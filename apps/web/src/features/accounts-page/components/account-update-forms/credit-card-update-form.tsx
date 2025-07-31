import { useMutation, useQuery } from "@tanstack/react-query";

import { getCreditCardById, updateCreditCard } from "@/services/account-service";
import { useAccountFormCleanUp } from "../../hooks/use-account-form-clean-up";
import { CreditCardForm, CreditCardFormValues } from "../account-forms";
import { AccountFormProps } from "../types";

type CreditCardUpdateFormProps = AccountFormProps & {
  accountId: number;
};

export function CreditCardUpdateForm({
  id,
  accountId,
  defaultErrorMsg,
  onStateChange,
}: CreditCardUpdateFormProps) {
  const { data: account } = useQuery({
    queryKey: ["credit-card", accountId],
    queryFn: async () => {
      onStateChange("loading");
      const res = await getCreditCardById(accountId);
      onStateChange("idle");
      return res.data;
    },
  });

  const {
    mutate: tryUpdateAccount,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: updateCreditCard,
    onSuccess: () => {
      onStateChange("success");
    },
    onError: () => {
      onStateChange("error");
    },
  });

  useAccountFormCleanUp(isSuccess, ["credit-card", accountId]);

  const handleSubmit = (data: CreditCardFormValues) => {
    onStateChange("loading");
    tryUpdateAccount({
      id: accountId,
      data,
    });
  };

  return (
    <CreditCardForm
      id={id}
      values={account}
      disabledFields={{
        initialBalance: true,
        currency: true,
      }}
      onSubmit={handleSubmit}
      errorMsg={isError ? defaultErrorMsg : undefined}
    />
  );
} 