"use client";

import {
  ChartNoAxesCombined,
  CreditCard,
  Landmark,
  Pencil,
  PiggyBank,
  Plus,
  Wallet,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { accountTypeMap } from "@/constants/enum-maps";
import { AccountFromGetAccounts } from "@/services/account-service";
import { createTransaction } from "@/services/transaction-service";
import { formatAmount } from "@/utils/formatters";
import { notifier } from "@/utils/notifier";
import { EAccountType, ECurrency } from "@opulenka/service";

import { CreateFormModal } from "@/components/form-modals";
import { TextLink } from "@/components/text-link";
import { TransactionForm } from "@/features/_components/transaction-form";
import { Button } from "@/lib/components/button";
import { Card, CardContent, CardHeader } from "@/lib/components/card";

interface AccountOverviewProps {
  account: AccountFromGetAccounts;
  currency: ECurrency;
  onEdit?: () => void;
}

const iconByAccountType = {
  [EAccountType.CASH]: <Wallet className="size-5" />,
  [EAccountType.CHECKING]: <Landmark className="size-5" />,
  [EAccountType.SAVINGS]: <PiggyBank className="size-5" />,
  [EAccountType.CREDIT_CARD]: <CreditCard className="size-5" />,
  [EAccountType.INVESTMENT]: <ChartNoAxesCombined className="size-5" />,
};

const iconColorByAccountType = {
  [EAccountType.CASH]: "text-primary",
  [EAccountType.CHECKING]: "text-chart-3",
  [EAccountType.SAVINGS]: "text-success",
  [EAccountType.CREDIT_CARD]: "text-destructive",
  [EAccountType.INVESTMENT]: "text-chart-4",
};

export function AccountOverview({ account, currency, onEdit }: AccountOverviewProps) {
  const tC = useTranslations("Common");
  const t = useTranslations("ActionMessages");
  const transactionT = tC("transaction_singular");

  const [addingTransaction, setAddingTransaction] = useState(false);

  const { accountNumber } = account;
  const transactionsPath = `/transactions?accountId=${account.id}`;
  const isNegative = account.balance < 0;

  const subTitleParts = [];
  if (account.serviceProvider && account.type !== EAccountType.CASH) {
    subTitleParts.push(account.serviceProvider);
  }
  if (accountNumber) {
    subTitleParts.push(`***${accountNumber.slice(-4)}`);
  }

  const closeTransactionModal = () => {
    setAddingTransaction(false);
  };

  const handleClickAddTransaction = () => {
    setAddingTransaction(true);
  };

  const handleSuccessAddTransaction = () => {
    closeTransactionModal();
    notifier.notify(t("createSuccess", { entity: transactionT }), "success");
  };

  return (
    <>
      <Card className="gap-2 py-5">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div
                className={`p-2.5 rounded-full bg-chart-0 ${iconColorByAccountType[account.type]}`}
              >
                {iconByAccountType[account.type]}
              </div>
              <div>
                <h4 className="text-lg font-medium text-foreground">{account.name}</h4>
                <p className="text-sm text-muted-foreground">{subTitleParts.join(" / ")}</p>
              </div>
            </div>

            <div>
              <p className="mb-1 text-right text-sm text-muted-foreground">
                {tC(accountTypeMap[account.type])}
              </p>
              <p
                className={`text-lg text-right ${isNegative ? "text-destructive" : "text-foreground"} font-bold`}
              >
                {formatAmount(account.balance, currency)}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {account.description ? (
            <p className="mb-3 text-sm text-muted-foreground">{account.description}</p>
          ) : null}

          <div className="flex items-center gap-2">
            <TextLink className="mr-2.5 text-sm font-normal" href={transactionsPath}>
              {tC("view")} {tC("transaction_plural")}
            </TextLink>

            <span className="w-px h-5 bg-muted-foreground" />

            <Button variant="ghost" size="sm" onClick={handleClickAddTransaction}>
              <Plus />
              {tC("add")} {tC("transaction_singular")}
            </Button>

            <span className="w-px h-5 bg-muted-foreground" />

            <Button variant="ghost" size="sm" onClick={onEdit}>
              <Pencil />
              {tC("edit")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <CreateFormModal
        title={`${tC("add")} ${tC("transaction_singular")}`}
        open={addingTransaction}
        defaultErrorMsg={t("createError", { entity: transactionT })}
        Form={TransactionForm}
        createFn={createTransaction}
        formProps={{
          defaultValues: {
            accountId: account.id,
          },
          defaultAccountOptions: [
            {
              label: account.name,
              value: account.id,
            },
          ],
          disabledFields: {
            accountId: true,
          },
        }}
        onSuccess={handleSuccessAddTransaction}
        onClose={closeTransactionModal}
      />
    </>
  );
}
