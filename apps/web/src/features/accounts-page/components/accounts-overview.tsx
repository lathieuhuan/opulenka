"use client";
import { useQueryClient } from "@tanstack/react-query";
import { PackageOpen, Plus, RefreshCcw } from "lucide-react";

import { AccountFromGetAccounts } from "@/services/account-service";
import { EAccountType, ECurrency } from "@opulenka/service";

import { accountTypeMap } from "@/constants/enum-maps";
import { Button } from "@/lib/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/components/dropdown-menu";
import { AccountOverview } from "./account-overview";

const ACCOUNT_TYPE_OPTIONS = [
  EAccountType.CASH,
  EAccountType.CREDIT_CARD,
  EAccountType.CHECKING,
  EAccountType.SAVINGS,
  EAccountType.INVESTMENT,
];

type AccountsOverviewProps = {
  accounts: AccountFromGetAccounts[];
  currency: ECurrency;
};

export function AccountsOverview({ accounts, currency }: AccountsOverviewProps) {
  const queryClient = useQueryClient();

  const handleRefreshAccounts = () => {
    queryClient.invalidateQueries({ queryKey: ["accounts"] });
  };

  return (
    <section>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              Your Accounts
              <Button variant="ghost" size="icon" onClick={handleRefreshAccounts}>
                <RefreshCcw />
              </Button>
            </CardTitle>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button>
                  <Plus className="size-5" />
                  Add
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {ACCOUNT_TYPE_OPTIONS.map((option) => (
                  <DropdownMenuItem key={option}>{accountTypeMap[option]}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {accounts.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <PackageOpen className="size-10 mx-auto mb-4" />
              <p>No accounts found</p>
            </div>
          ) : (
            accounts.map((account) => (
              <AccountOverview
                key={account.id}
                account={account}
                currency={currency}
                onViewTransactions={() => {}}
                onEdit={() => {}}
              />
            ))
          )}
        </CardContent>
      </Card>
    </section>
  );
}
