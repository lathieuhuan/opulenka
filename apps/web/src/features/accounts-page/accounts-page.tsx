"use client";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

import { getAccounts } from "@/services/account-service";
import { ECurrency } from "@opulenka/service";

import { AccountsOverview } from "./components/accounts-overview";
import { AccountsSummary } from "./components/accounts-summary";
import { PageError } from "./components/page-error";
import { PageSkeleton } from "./components/page-skeleton";

export function AccountsPage() {
  const t = useTranslations("AccountsPage");

  // TODO: get currency from user settings
  const currency = ECurrency.VND;

  const {
    data: accounts = [],
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["accounts"],
    queryFn: () => getAccounts(),
    select: (response) => response.data,
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">{t("title")}</h2>

      {isLoading ? (
        <PageSkeleton />
      ) : isError ? (
        <PageError isRetrying={isRefetching} handleRetry={refetch} />
      ) : (
        <div className="space-y-6">
          <AccountsSummary accounts={accounts} currency={currency} />
          <AccountsOverview accounts={accounts} currency={currency} />
        </div>
      )}
    </div>
  );
}
