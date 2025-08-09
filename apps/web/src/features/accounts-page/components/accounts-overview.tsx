"use client";
import { useQueryClient } from "@tanstack/react-query";
import { PackageOpen, Plus, RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { accountTypeMap } from "@/constants/enum-maps";
import { AccountFromGetAccounts } from "@/services/account-service";
import { EAccountType, ECurrency } from "@opulenka/service";

import { Button } from "@/lib/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/components/dropdown-menu";
import { AccountFormModal } from "./account-form-modal";
import { AccountOverview } from "./account-overview";

const ACCOUNT_TYPE_OPTIONS = [
  EAccountType.CASH,
  EAccountType.CREDIT_CARD,
  EAccountType.CHECKING,
  EAccountType.SAVINGS,
  EAccountType.INVESTMENT,
];

type AccountFormModalState = {
  open: boolean;
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
  const [formModal, setFormModal] = useState<AccountFormModalState>({
    open: false,
    updateAccountId: null,
    type: EAccountType.CASH,
  });

  const refreshAccounts = () => {
    queryClient.invalidateQueries({ queryKey: ["accounts"] });
  };

  const updateAccountFormModal = (newState: Partial<typeof formModal>) => {
    setFormModal((prev) => ({
      ...prev,
      ...newState,
    }));
  };

  const openAccountFormModal = (type: EAccountType, updateAccountId: number | null = null) => {
    updateAccountFormModal({
      open: true,
      updateAccountId,
      type,
    });
  };

  const closeAccountFormModal = () => {
    updateAccountFormModal({ open: false });
  };

  return (
    <section>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              {t("title")}
              <Button variant="ghost" size="icon" onClick={refreshAccounts}>
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

      <AccountFormModal
        {...formModal}
        onSuccess={() => {
          closeAccountFormModal();
          refreshAccounts();
        }}
        onClose={closeAccountFormModal}
      />
    </section>
  );
}
