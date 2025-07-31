import { useMutation, useQuery } from "@tanstack/react-query";

import { getSavingsAccountById, updateSavingsAccount } from "@/services/account-service";
import { useAccountFormCleanUp } from "../../hooks/use-account-form-clean-up";
import { SavingsAccountForm, SavingsAccountFormValues } from "../account-forms";
import { AccountFormProps } from "../types";

type SavingsAccountUpdateFormProps = AccountFormProps & {
  accountId: number;
};

export function SavingsAccountUpdateForm({
  id,
  accountId,
  defaultErrorMsg,
  onStateChange,
}: SavingsAccountUpdateFormProps) {
  const { data: account } = useQuery({
    queryKey: ["savings-account", accountId],
    queryFn: async () => {
      onStateChange("loading");
      const res = await getSavingsAccountById(accountId);
      onStateChange("idle");
      return res.data;
    },
  });

  const {
    mutate: tryUpdateAccount,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: updateSavingsAccount,
    onSuccess: () => {
      onStateChange("success");
    },
    onError: () => {
      onStateChange("error");
    },
  });

  useAccountFormCleanUp(isSuccess, ["savings-account", accountId]);

  const handleSubmit = (data: SavingsAccountFormValues) => {
    onStateChange("loading");
    tryUpdateAccount({
      id: accountId,
      data,
    });
  };

  return (
    <SavingsAccountForm
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