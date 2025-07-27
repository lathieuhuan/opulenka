import { ECurrency } from "@opulenka/service";

import { cn } from "@/lib/utils/functions";
import { AccountFromGetAccounts } from "@/services/account-service";
import { formatAmount } from "@/utils/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/card";

type AccountsSummaryProps = {
  accounts: AccountFromGetAccounts[];
  currency: ECurrency;
};

export function AccountsSummary({ accounts, currency }: AccountsSummaryProps) {
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const totalAssets = accounts
    .filter((account) => account.balance > 0)
    .reduce((sum, account) => sum + account.balance, 0);
  const totalLiabilities = Math.abs(
    accounts
      .filter((account) => account.balance < 0)
      .reduce((sum, account) => sum + account.balance, 0),
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <SummarySection
        title="Total Balance"
        amount={formatAmount(totalBalance, currency)}
        description="Across all accounts"
      />
      <SummarySection
        title="Total Assets"
        amount={formatAmount(totalAssets, currency)}
        valueClassName="text-success"
        description="Including investments"
      />
      <SummarySection
        title="Total Liabilities"
        amount={formatAmount(totalLiabilities, currency)}
        valueClassName="text-destructive"
        description="Credit cards & loans"
      />
    </section>
  );
}

type SummarySectionProps = {
  title: string;
  amount: string;
  valueClassName?: string;
  description: string;
};

function SummarySection({ title, amount, valueClassName, description }: SummarySectionProps) {
  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={cn("text-2xl font-bold", valueClassName)}>{amount}</p>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}
