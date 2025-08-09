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

type AccountModalState = {
  open: boolean;
  updateId?: number;
  type: EAccountType;
};

type AccountsOverviewProps = {
  accounts: AccountFromGetAccounts[];
  currency: ECurrency;
};

export function AccountsOverview({ accounts, currency }: AccountsOverviewProps) {
  const tC = useTranslations("Common");
  const t = useTranslations("AccountsOverview");
  const queryClient = useQueryClient();
  const [accountModal, setAccountModal] = useState<AccountModalState>({
    open: false,
    type: EAccountType.CASH,
  });

  const refreshAccounts = () => {
    queryClient.invalidateQueries({ queryKey: ["accounts"] });
  };

  const updateAccountFormModal = (newState: Partial<typeof accountModal>) => {
    setAccountModal((prev) => ({
      ...prev,
      ...newState,
    }));
  };

  const openAccountModal = (type: EAccountType, updateId?: number) => {
    updateAccountFormModal({
      open: true,
      updateId,
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
                  <DropdownMenuItem key={option} onClick={() => openAccountModal(option)}>
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
                onEdit={() => openAccountModal(account.type, account.id)}
              />
            ))
          )}
        </CardContent>
      </Card>

      <AccountFormModal
        {...accountModal}
        onSuccess={() => {
          closeAccountFormModal();
          refreshAccounts();
        }}
        onClose={closeAccountFormModal}
      />
    </section>
  );
}
