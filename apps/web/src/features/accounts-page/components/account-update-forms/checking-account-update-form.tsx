import { useMutation, useQuery } from "@tanstack/react-query";

import { getCheckingAccountById, updateCheckingAccount } from "@/services/account-service";
import { CheckingAccountForm, CheckingAccountFormValues } from "../account-forms";
import { useAccountFormCleanUp } from "../../hooks/use-account-form-clean-up";
import { AccountFormProps } from "../types";

type CheckingAccountUpdateFormProps = AccountFormProps & {
  accountId: number;
};

export function CheckingAccountUpdateForm({
  id,
  accountId,
  defaultErrorMsg,
  onStateChange,
}: CheckingAccountUpdateFormProps) {
  const { data: account } = useQuery({
    queryKey: ["checking-account", accountId],
    queryFn: async () => {
      onStateChange("loading");
      const res = await getCheckingAccountById(accountId);
      onStateChange("idle");
      return res.data;
    },
  });

  const {
    mutate: tryUpdateAccount,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: updateCheckingAccount,
    onSuccess: () => {
      onStateChange("success");
    },
    onError: () => {
      onStateChange("error");
    },
  });

  useAccountFormCleanUp(isSuccess, ["checking-account", accountId]);

  const handleSubmit = (data: CheckingAccountFormValues) => {
    onStateChange("loading");
    tryUpdateAccount({
      id: accountId,
      data,
    });
  };

  return (
    <CheckingAccountForm
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