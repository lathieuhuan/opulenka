import { useMutation, useQuery } from "@tanstack/react-query";

import { getInvestmentAccountById, updateInvestmentAccount } from "@/services/account-service";
import { useAccountFormCleanUp } from "../../hooks/use-account-form-clean-up";
import { InvestmentAccountForm, InvestmentAccountFormValues } from "../account-forms";
import { AccountFormProps } from "../types";

type InvestmentAccountUpdateFormProps = AccountFormProps & {
  accountId: number;
};

export function InvestmentAccountUpdateForm({
  id,
  accountId,
  defaultErrorMsg,
  onStateChange,
}: InvestmentAccountUpdateFormProps) {
  const { data: account } = useQuery({
    queryKey: ["investment-account", accountId],
    queryFn: async () => {
      onStateChange("loading");
      const res = await getInvestmentAccountById(accountId);
      onStateChange("idle");
      return res.data;
    },
  });

  const {
    mutate: tryUpdateAccount,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: updateInvestmentAccount,
    onSuccess: () => {
      onStateChange("success");
    },
    onError: () => {
      onStateChange("error");
    },
  });

  useAccountFormCleanUp(isSuccess, ["investment-account", accountId]);

  const handleSubmit = (data: InvestmentAccountFormValues) => {
    onStateChange("loading");
    tryUpdateAccount({
      id: accountId,
      data,
    });
  };

  return (
    <InvestmentAccountForm
      id={id}
      values={account}
      disabledFields={{
        accountNumber: true,
        serviceProvider: true,
        initialBalance: true,
        currency: true,
      }}
      onSubmit={handleSubmit}
      errorMsg={isError ? defaultErrorMsg : undefined}
    />
  );
}
