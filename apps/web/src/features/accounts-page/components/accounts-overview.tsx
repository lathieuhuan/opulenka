"use client";
import { useQueryClient } from "@tanstack/react-query";
import { PackageOpen, Plus, RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { accountTypeMap } from "@/constants/enum-maps";
import { AccountFromGetAccounts } from "@/services/account-service";
import { notifier } from "@/utils/notifier";
import { EAccountType, ECurrency } from "@opulenka/service";
import { AccountFormProps, AccountFormState } from "./types";

import { Button } from "@/lib/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/components/dropdown-menu";
import { Modal } from "@/lib/components/modal";
import {
  CashAccountCreateForm,
  CheckingAccountCreateForm,
  CreditCardCreateForm,
  InvestmentAccountCreateForm,
  SavingsAccountCreateForm,
} from "./account-create-forms";
import { AccountOverview } from "./account-overview";
import {
  CashAccountUpdateForm,
  CheckingAccountUpdateForm,
  CreditCardUpdateForm,
  InvestmentAccountUpdateForm,
  SavingsAccountUpdateForm,
} from "./account-update-forms";

const FORM_ID = "account-form";
const ACCOUNT_TYPE_OPTIONS = [
  EAccountType.CASH,
  EAccountType.CREDIT_CARD,
  EAccountType.CHECKING,
  EAccountType.SAVINGS,
  EAccountType.INVESTMENT,
];

type AccountFormModal = {
  isActive: boolean;
  isLoading: boolean;
  updateAccountId: number | null;
  type: EAccountType;
};

type AccountsOverviewProps = {
  accounts: AccountFromGetAccounts[];
  currency: ECurrency;
};

export function AccountsOverview({ accounts, currency }: AccountsOverviewProps) {
  const t = useTranslations("AccountsOverview");
  const tC = useTranslations("Common");
  const queryClient = useQueryClient();
  const [accountFormModal, setAccountFormModal] = useState<AccountFormModal>({
    isActive: false,
    isLoading: false,
    updateAccountId: null,
    type: EAccountType.CASH,
  });
  const isAccountCreateModal = accountFormModal.updateAccountId === null;

  const handleRefreshAccounts = () => {
    queryClient.invalidateQueries({ queryKey: ["accounts"] });
  };

  const updateAccountFormModal = (newState: Partial<typeof accountFormModal>) => {
    setAccountFormModal((prev) => ({
      ...prev,
      ...newState,
    }));
  };

  const openAccountFormModal = (type: EAccountType, updateAccountId: number | null = null) => {
    updateAccountFormModal({
      isActive: true,
      isLoading: false,
      updateAccountId,
      type,
    });
  };

  const handleAccountFormStateChange = (state: AccountFormState) => {
    switch (state) {
      case "success":
        notifier.notify(t(isAccountCreateModal ? "createSuccess" : "updateSuccess"), "success");
        queryClient.invalidateQueries({ queryKey: ["accounts"] });
        updateAccountFormModal({ isActive: false });
        break;
      case "loading":
        updateAccountFormModal({ isLoading: true });
        break;
      case "error":
      case "idle":
        updateAccountFormModal({ isLoading: false });
        break;
    }
  };

  const accountModalTitle = [
    isAccountCreateModal ? tC("add") : tC("edit"),
    tC(accountTypeMap[accountFormModal.type]),
  ].join(" ");

  let accountForm: React.ReactNode | null = null;
  const accountFormProps: AccountFormProps = {
    id: FORM_ID,
    defaultErrorMsg: t(isAccountCreateModal ? "createError" : "updateError"),
    onStateChange: handleAccountFormStateChange,
  };

  if (isAccountCreateModal) {
    switch (accountFormModal.type) {
      case EAccountType.CASH:
        accountForm = <CashAccountCreateForm {...accountFormProps} />;
        break;
      case EAccountType.INVESTMENT:
        accountForm = <InvestmentAccountCreateForm {...accountFormProps} />;
        break;
      case EAccountType.CHECKING:
        accountForm = <CheckingAccountCreateForm {...accountFormProps} />;
        break;
      case EAccountType.SAVINGS:
        accountForm = <SavingsAccountCreateForm {...accountFormProps} />;
        break;
      case EAccountType.CREDIT_CARD:
        accountForm = <CreditCardCreateForm {...accountFormProps} />;
        break;
    }
  } else if (accountFormModal.updateAccountId !== null) {
    switch (accountFormModal.type) {
      case EAccountType.CASH:
        accountForm = (
          <CashAccountUpdateForm
            {...accountFormProps}
            accountId={accountFormModal.updateAccountId}
          />
        );
        break;
      case EAccountType.INVESTMENT:
        accountForm = (
          <InvestmentAccountUpdateForm
            {...accountFormProps}
            accountId={accountFormModal.updateAccountId}
          />
        );
        break;
      case EAccountType.CHECKING:
        accountForm = (
          <CheckingAccountUpdateForm
            {...accountFormProps}
            accountId={accountFormModal.updateAccountId}
          />
        );
        break;
      case EAccountType.SAVINGS:
        accountForm = (
          <SavingsAccountUpdateForm
            {...accountFormProps}
            accountId={accountFormModal.updateAccountId}
          />
        );
        break;
      case EAccountType.CREDIT_CARD:
        accountForm = (
          <CreditCardUpdateForm
            {...accountFormProps}
            accountId={accountFormModal.updateAccountId}
          />
        );
        break;
    }
  }

  return (
    <section>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              {t("title")}
              <Button variant="ghost" size="icon" onClick={handleRefreshAccounts}>
                <RefreshCcw />
              </Button>
            </CardTitle>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Plus className="size-5" />
                  {tC("add")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {ACCOUNT_TYPE_OPTIONS.map((option) => (
                  <DropdownMenuItem key={option} onClick={() => openAccountFormModal(option)}>
                    {tC(accountTypeMap[option])}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {accounts.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <PackageOpen className="size-10 mx-auto mb-4" />
              <p>{t("noAccounts")}</p>
            </div>
          ) : (
            accounts.map((account) => (
              <AccountOverview
                key={account.id}
                account={account}
                currency={currency}
                onViewTransactions={() => {}}
                onEdit={() => openAccountFormModal(account.type, account.id)}
              />
            ))
          )}
        </CardContent>
      </Card>

      <Modal
        title={accountModalTitle}
        isActive={accountFormModal.isActive}
        isLoading={accountFormModal.isLoading}
        confirmBtnProps={{
          form: FORM_ID,
          type: "submit",
          disabled: accountFormModal.isLoading,
        }}
        onClose={() => updateAccountFormModal({ isActive: false })}
      >
        {accountForm}
      </Modal>
    </section>
  );
}
