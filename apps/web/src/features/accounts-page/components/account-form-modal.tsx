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

type AccountFormModalProps = {
  open: boolean;
  updateAccountId: number | null;
  type: EAccountType;
  onSuccess?: () => void;
  onClose: () => void;
};

export function AccountFormModal({
  open,
  updateAccountId,
  type,
  onSuccess,
  onClose,
}: AccountFormModalProps) {
  const t = useTranslations("AccountsOverview");
  const tC = useTranslations("Common");

  if (updateAccountId) {
    const commonProps = {
      title: `${tC("edit")} ${tC(accountTypeMap[type])}`,
      open,
      defaultErrorMsg: t("updateError"),
      onSuccess,
      onClose,
    };

    switch (type) {
      case EAccountType.CASH:
        return (
          <UpdateFormModal
            {...commonProps}
            Form={CashAccountForm}
            queryKey={["cash-accounts", updateAccountId]}
            queryFn={() => getCashAccountById(updateAccountId).then((res) => res.data)}
            updateFn={(data) => updateCashAccount({ id: updateAccountId, data })}
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
            queryKey={["checking-accounts", updateAccountId]}
            queryFn={() => getCheckingAccountById(updateAccountId).then((res) => res.data)}
            updateFn={(data) => updateCheckingAccount({ id: updateAccountId, data })}
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
            queryKey={["credit-cards", updateAccountId]}
            queryFn={() => getCreditCardById(updateAccountId).then((res) => res.data)}
            updateFn={(data) => updateCreditCard({ id: updateAccountId, data })}
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
            queryKey={["savings-accounts", updateAccountId]}
            queryFn={() => getSavingsAccountById(updateAccountId).then((res) => res.data)}
            updateFn={(data) => updateSavingsAccount({ id: updateAccountId, data })}
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
            queryKey={["investment-accounts", updateAccountId]}
            queryFn={() => getInvestmentAccountById(updateAccountId).then((res) => res.data)}
            updateFn={(data) => updateInvestmentAccount({ id: updateAccountId, data })}
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
    defaultErrorMsg: t("createError"),
    onSuccess,
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
