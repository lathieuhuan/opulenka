"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { DefaultValues, useForm } from "react-hook-form";

import { USE_FORM_DEFAULT_PROPS } from "@/constants/features";
import { SelectOption } from "@/lib/components/select";
import { FormDisabledFields, UseFormValues } from "@/types/utils";
import {
  CreateTransactionSchema,
  createTransactionSchema,
} from "@/validation-schemas/transaction-schemas";
import { ETransactionType } from "@opulenka/service";

// Components
import { Form, FormInput, FormInputNumber, FormSelect } from "@/components/form";
import { Message } from "@/lib/components/message";
import { transactionTypeMap } from "@/constants/enum-maps";

export type TransactionFormValues = CreateTransactionSchema;

const TRANSACTION_TYPE_OPTIONS = [
  ETransactionType.INCOME,
  ETransactionType.EXPENSE,
  ETransactionType.TRANSFER,
];

type TransactionFormProps = {
  id?: string;
  values?: UseFormValues<TransactionFormValues>;
  defaultValues?: DefaultValues<TransactionFormValues>;
  defaultAccountOptions?: SelectOption[];
  disabledFields?: FormDisabledFields<TransactionFormValues>;
  errorMsg?: string;
  onSubmit?: (data: TransactionFormValues) => void;
};

export function TransactionForm({
  id,
  values,
  defaultValues,
  defaultAccountOptions,
  disabledFields,
  errorMsg,
  onSubmit,
}: TransactionFormProps) {
  const tC = useTranslations("Common");
  const t = useTranslations("TransactionForms");
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: ETransactionType.INCOME,
      ...defaultValues,
    },
    values,
    ...USE_FORM_DEFAULT_PROPS,
  });

  const handleSubmit = async (data: TransactionFormValues) => {
    onSubmit?.(data);
  };

  const selectedType = form.watch("type");

  const transactionTypeOptions = TRANSACTION_TYPE_OPTIONS.map((type) => ({
    label: tC(transactionTypeMap[type]),
    value: type,
  }));

  return (
    <Form id={id} form={form} className="grid grid-cols-2 gap-3" onSubmit={handleSubmit}>
      <FormSelect
        name="accountId"
        label={tC("account_singular")}
        required
        disabled={disabledFields?.accountId}
        options={defaultAccountOptions}
      />

      <FormSelect
        name="type"
        label={t("type")}
        required
        disabled={disabledFields?.type}
        options={transactionTypeOptions}
      />

      <FormInputNumber
        name="amount"
        label={t("amount")}
        required
        disabled={disabledFields?.amount}
      />

      {selectedType === ETransactionType.TRANSFER && (
        <FormInputNumber
          name="receiveAccountId"
          label={t("receiveAccountId")}
          disabled={disabledFields?.receiveAccountId}
        />
      )}

      <FormInput
        name="description"
        label={t("description")}
        fieldClass="col-span-2"
        disabled={disabledFields?.description}
      />

      <FormInputNumber name="fee" label={t("fee")} disabled={disabledFields?.fee} step="0.01" />

      {errorMsg ? <Message preset="error" className="col-span-2" message={errorMsg} /> : null}
    </Form>
  );
}
