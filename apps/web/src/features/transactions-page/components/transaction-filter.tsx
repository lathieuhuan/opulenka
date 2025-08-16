import { RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";

import { useTransactionTypeOptions } from "@/hooks/transactions";
import { GetTransactionsSchema } from "@/validation-schemas/transaction-schemas";

import { Form, FormDatePicker, FormSelect } from "@/components/form";
import { Button } from "@/lib/components/button";

export type TransactionFilterValues = Pick<
  GetTransactionsSchema,
  "accountId" | "type" | "createdFrom" | "createdTo"
>;

type TransactionFilterProps = {
  form: UseFormReturn<TransactionFilterValues>;
  onApply?: (data: TransactionFilterValues) => void;
};

export function TransactionFilter({ form, onApply }: TransactionFilterProps) {
  const tC = useTranslations("Common");

  const transactionTypeOptions = useTransactionTypeOptions();

  const handleSubmit = (data: TransactionFilterValues) => {
    onApply?.(data);
  };

  const handleReset = () => {
    form.reset();
    onApply?.({});
  };

  return (
    <Form form={form} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/*  */}
        <FormSelect name="accountId" label={tC("account_singular")} />

        <FormSelect name="type" label={tC("type")} options={transactionTypeOptions} allowClear />

        <FormDatePicker name="createdFrom" label={tC("createdFrom")} />
        <FormDatePicker name="createdTo" label={tC("createdTo")} />
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" onClick={handleReset}>
          <RefreshCcw className="size-4" />
          {tC("reset")}
        </Button>
        <Button color="primary" type="submit">
          {tC("apply")}
        </Button>
      </div>
    </Form>
  );
}
