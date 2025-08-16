"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Filter, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { DEFAULT_PAGINATION_PARAMS, USE_FORM_DEFAULT_PROPS } from "@/constants/features";
import { useTransactions } from "@/hooks/transactions";
import { useQueryParams } from "@/hooks/utils";
import { createTransaction } from "@/services/transaction-service";
import { formatAmount, formatDate } from "@/utils/formatters";
import { notifier } from "@/utils/notifier";
import { getTransactionsSchema, GetTransactionsSchema } from "@/validation-schemas/transaction-schemas";
import { ECurrency, TransactionDTO } from "@opulenka/service";

import { CreateFormModal } from "@/components/form-modals";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/components/accordion";
import { Button } from "@/lib/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/card";
import { Empty } from "@/lib/components/empty";
import { Pagination } from "@/lib/components/pagination";
import { Skeleton } from "@/lib/components/skeleton";
import { TransactionForm } from "../_components/transaction-form";
import { TransactionFilter, TransactionFilterValues } from "./components/transaction-filter";
import { TransactionItem } from "./components/transaction-item";

type TransactionModalState = {
  open: boolean;
  updateId?: number;
};

type TransactionsPageProps = {
  initialTransactions?: TransactionDTO[];
};

export function TransactionsPage({ initialTransactions }: TransactionsPageProps) {
  const tC = useTranslations("Common");
  const tMsg = useTranslations("ActionMessages");
  const t = useTranslations("TransactionsPage");
  const transactionT = tC("transaction_singular");

  const [transactionModal, setTransactionModal] = useState<TransactionModalState>({
    open: false,
  });

  const { params, valid, updateParams } = useQueryParams(
    getTransactionsSchema,
    DEFAULT_PAGINATION_PARAMS,
  );
  const { data: transactions = [], isLoading } = useTransactions(params, {
    initialData: initialTransactions,
    enabled: valid,
    staleTime: 30 * 1000,
  });
  const form = useForm<GetTransactionsSchema>({
    resolver: zodResolver(getTransactionsSchema),
    defaultValues: params,
    ...USE_FORM_DEFAULT_PROPS,
  });

  // TODO: get currency from user settings
  const currency = ECurrency.VND;

  const handleApplyFilter = (data: TransactionFilterValues) => {
    updateParams(data);
  };

  const handleChangePage = (page: number) => {
    form.setValue("page", page);
    form.handleSubmit(handleApplyFilter)();
  };

  const closeTransactionModal = () => {
    setTransactionModal({ open: false });
  };

  const handleSuccessAddTransaction = () => {
    setTransactionModal({ open: false });
    notifier.notify(tMsg("createSuccess", { entity: transactionT }), "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-foreground">{t("title")}</h2>
        <Button color="default" onClick={() => setTransactionModal({ open: true })}>
          <Plus className="size-4" />
          {tC("add")}
        </Button>
      </div>

      <Card className="py-2">
        <CardContent>
          <Accordion type="single" collapsible>
            <AccordionItem value="filter">
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  <Filter className="size-5" />
                  <h2 className="text-lg font-semibold">{tC("filter")}</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <TransactionFilter form={form} onApply={handleApplyFilter} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{tC("result_plural")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="columns-1 md:columns-2">
            {isLoading ? (
              <>
                <Skeleton className="h-[78px]" />
                <Skeleton className="h-[78px]" />
              </>
            ) : (
              transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  type={transaction.type}
                  amount={formatAmount(transaction.amount, currency)}
                  date={formatDate(transaction.createdAt)}
                />
              ))
            )}
          </div>

          {!isLoading && !transactions.length && <Empty message={t("noTransactions")} />}

          {/* <div className="flex items-center justify-between border-t border-border pt-4 mt-6">
            <div className="flex items-center">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">1</span> to{" "}
                <span className="font-medium text-foreground">8</span> of{" "}
                <span className="font-medium text-foreground">35</span> transactions
              </p>
            </div>

            <Pagination total={10} current={params.page} onChange={handleChangePage} />
          </div> */}
        </CardContent>
      </Card>

      <CreateFormModal
        title={`${tC("add")} ${transactionT}`}
        open={transactionModal.open}
        defaultErrorMsg={tMsg("createError", { entity: transactionT })}
        Form={TransactionForm}
        createFn={createTransaction}
        onSuccess={handleSuccessAddTransaction}
        onClose={closeTransactionModal}
      />
    </div>
  );
}
