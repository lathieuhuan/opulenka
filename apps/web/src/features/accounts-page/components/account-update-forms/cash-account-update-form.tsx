import { useMutation, useQuery } from "@tanstack/react-query";

import { getCashAccountById, updateCashAccount } from "@/services/account-service";
import { useAccountFormCleanUp } from "../../hooks/use-account-form-clean-up";
import { CashAccountForm, CashAccountFormValues } from "../account-forms";
import { AccountFormProps } from "../types";

type CashAccountUpdateFormProps = AccountFormProps & {
  accountId: number;
};

export function CashAccountUpdateForm({
  id,
  accountId,
  defaultErrorMsg,
  onStateChange,
}: CashAccountUpdateFormProps) {
  const { data: account } = useQuery({
    queryKey: ["cash-account", accountId],
    queryFn: async () => {
      onStateChange("loading");
      const res = await getCashAccountById(accountId);
      onStateChange("idle");
      return res.data;
    },
  });

  const {
    mutate: tryUpdateAccount,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: updateCashAccount,
    onSuccess: () => {
      onStateChange("success");
    },
    onError: () => {
      onStateChange("error");
    },
  });

  useAccountFormCleanUp(isSuccess, ["cash-account", accountId]);

  const handleSubmit = (data: CashAccountFormValues) => {
    onStateChange("loading");
    tryUpdateAccount({
      id: accountId,
      data,
    });
  };

  return (
    <CashAccountForm
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
