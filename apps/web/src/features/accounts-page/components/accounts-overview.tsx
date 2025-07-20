"use client";
import { PackageOpen, Plus } from "lucide-react";

import { cn } from "@/lib/utils/functions";
import { AccountFromGetAccounts } from "@/services/account-service";
import { formatCurrency } from "@/utils/formatters";

import { Button } from "@/lib/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/card";
import { AccountOverview } from "./account-overview";

type AccountsOverviewProps = {
  accounts: AccountFromGetAccounts[];
};

export function AccountsOverview({ accounts }: AccountsOverviewProps) {
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const totalAssets = accounts
    .filter((account) => account.balance > 0)
    .reduce((sum, account) => sum + account.balance, 0);
  const totalLiabilities = Math.abs(
    accounts
      .filter((account) => account.balance < 0)
      .reduce((sum, account) => sum + account.balance, 0),
  );

  const handleAddAccount = () => {
    // TODO: Open add account modal/form
    console.log("Add new account");
  };

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummarySection
          title="Total Balance"
          value={totalBalance}
          description="Across all accounts"
        />
        <SummarySection
          title="Total Assets"
          value={totalAssets}
          valueClassName="text-success"
          description="Including investments"
        />
        <SummarySection
          title="Total Liabilities"
          value={totalLiabilities}
          valueClassName="text-destructive"
          description="Credit cards & loans"
        />
      </section>

      <section>
        <Card>
          <CardHeader className="border-b border-border">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">Your Accounts</CardTitle>
              <Button onClick={handleAddAccount}>
                <Plus className="size-5" />
                Add
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            {accounts.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <PackageOpen className="size-10 mx-auto mb-4" />
                <p>No accounts found</p>
              </div>
            ) : (
              accounts.map((account) => <AccountOverview key={account.id} />)
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

type SummarySectionProps = {
  title: string;
  value: number;
  valueClassName?: string;
  description: string;
};

export function SummarySection({ title, value, valueClassName, description }: SummarySectionProps) {
  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={cn("text-3xl font-bold", valueClassName)}>{formatCurrency(value)}</p>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
