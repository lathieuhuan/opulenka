import { useTranslations } from "next-intl";

import { accountTypeMap } from "@/constants/enum-maps";
import {
  createCashAccount,
  createCheckingAccount,
  createCreditCard,
  createInvestmentAccount,
  createSavingsAccount,
  getCashAccountById,
  getCheckingAccountById,
  getCreditCardById,
  getInvestmentAccountById,
  getSavingsAccountById,
  updateCashAccount,
  updateCheckingAccount,
  updateCreditCard,
  updateInvestmentAccount,
  updateSavingsAccount,
} from "@/services/account-service";
import { EAccountType } from "@opulenka/service";

import { CreateFormModal, UpdateFormModal } from "@/components/form-modals";
import {
  CashAccountForm,
  CheckingAccountForm,
  CreditCardForm,
  InvestmentAccountForm,
  SavingsAccountForm,
} from "@/features/_components/account-forms";
import { notifier } from "@/utils/notifier";

type AccountFormModalProps = {
  open: boolean;
  updateId?: number;
  type: EAccountType;
  onSuccess?: () => void;
  onClose: () => void;
};

export function AccountFormModal({
  open,
  updateId,
  type,
  onSuccess,
  onClose,
}: AccountFormModalProps) {
  const tC = useTranslations("Common");
  const t = useTranslations("ActionMessages");
  const accountT = tC("account_singular");

  if (updateId) {
    const commonProps = {
      title: `${tC("edit")} ${tC(accountTypeMap[type])}`,
      open,
      defaultErrorMsg: t("updateError", { entity: accountT }),
      onSuccess: () => {
        onSuccess?.();
        notifier.notify(t("updateSuccess", { entity: accountT }), "success");
      },
      onClose,
    };

    switch (type) {
      case EAccountType.CASH:
        return (
          <UpdateFormModal
            {...commonProps}
            Form={CashAccountForm}
            queryKey={["cash-accounts", updateId]}
            queryFn={() => getCashAccountById(updateId).then((res) => res.data)}
            updateFn={(data) => updateCashAccount({ id: updateId, data })}
            formProps={{
              disabledFields: {
                initialBalance: true,
                currency: true,
              },
            }}
          />
        );
      case EAccountType.CHECKING:
        return (
          <UpdateFormModal
            {...commonProps}
            Form={CheckingAccountForm}
            queryKey={["checking-accounts", updateId]}
            queryFn={() => getCheckingAccountById(updateId).then((res) => res.data)}
            updateFn={(data) => updateCheckingAccount({ id: updateId, data })}
            formProps={{
              disabledFields: {
                initialBalance: true,
                currency: true,
              },
            }}
          />
        );
      case EAccountType.CREDIT_CARD:
        return (
          <UpdateFormModal
            {...commonProps}
            Form={CreditCardForm}
            queryKey={["credit-cards", updateId]}
            queryFn={() => getCreditCardById(updateId).then((res) => res.data)}
            updateFn={(data) => updateCreditCard({ id: updateId, data })}
            formProps={{
              disabledFields: {
                initialBalance: true,
                currency: true,
              },
            }}
          />
        );
      case EAccountType.SAVINGS:
        return (
          <UpdateFormModal
            {...commonProps}
            Form={SavingsAccountForm}
            queryKey={["savings-accounts", updateId]}
            queryFn={() => getSavingsAccountById(updateId).then((res) => res.data)}
            updateFn={(data) => updateSavingsAccount({ id: updateId, data })}
            formProps={{
              disabledFields: {
                initialBalance: true,
                currency: true,
              },
            }}
          />
        );
      case EAccountType.INVESTMENT:
        return (
          <UpdateFormModal
            {...commonProps}
            Form={InvestmentAccountForm}
            queryKey={["investment-accounts", updateId]}
            queryFn={() => getInvestmentAccountById(updateId).then((res) => res.data)}
            updateFn={(data) => updateInvestmentAccount({ id: updateId, data })}
            formProps={{
              disabledFields: {
                initialBalance: true,
                currency: true,
              },
            }}
          />
        );
      default:
        return null;
    }
  }

  const commonProps = {
    title: `${tC("add")} ${tC(accountTypeMap[type])}`,
    open,
    defaultErrorMsg: t("createError", { entity: accountT }),
    onSuccess: () => {
      onSuccess?.();
      notifier.notify(t("createSuccess", { entity: accountT }), "success");
    },
    onClose,
  };

  switch (type) {
    case EAccountType.CASH:
      return (
        <CreateFormModal {...commonProps} Form={CashAccountForm} createFn={createCashAccount} />
      );
    case EAccountType.CHECKING:
      return (
        <CreateFormModal
          {...commonProps}
          Form={CheckingAccountForm}
          createFn={createCheckingAccount}
        />
      );
    case EAccountType.CREDIT_CARD:
      return <CreateFormModal {...commonProps} Form={CreditCardForm} createFn={createCreditCard} />;
    case EAccountType.SAVINGS:
      return (
        <CreateFormModal
          {...commonProps}
          Form={SavingsAccountForm}
          createFn={createSavingsAccount}
        />
      );
    case EAccountType.INVESTMENT:
      return (
        <CreateFormModal
          {...commonProps}
          Form={InvestmentAccountForm}
          createFn={createInvestmentAccount}
        />
      );
    default:
      return null;
  }
}
