"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { USE_FORM_DEFAULT_PROPS } from "@/constants/features";
import { CURRENCY_OPTIONS } from "@/features/_constants/options";
import { FormDisabledFields, UseFormValues } from "@/types/utils";
import {
  CreateCashAccountSchema,
  createCashAccountSchema,
} from "@/validation-schemas/account-schemas";
import { ECurrency } from "@opulenka/service";

// Components
import { Form, FormInput, FormInputNumber, FormSelect } from "@/components/form";
import { Message } from "@/lib/components/message";

export type CashAccountFormValues = CreateCashAccountSchema;

type CashAccountFormProps = {
  id?: string;
  values?: UseFormValues<CashAccountFormValues>;
  disabledFields?: FormDisabledFields<CashAccountFormValues>;
  errorMsg?: string;
  onSubmit?: (data: CashAccountFormValues) => void;
};

export function CashAccountForm({
  id,
  values,
  disabledFields,
  errorMsg,
  onSubmit,
}: CashAccountFormProps) {
  const t = useTranslations("AccountForms");
  const form = useForm({
    resolver: zodResolver(createCashAccountSchema),
    defaultValues: {
      currency: ECurrency.VND,
      initialBalance: 0,
    },
    values,
    ...USE_FORM_DEFAULT_PROPS,
  });

  const handleSubmit = async (data: CashAccountFormValues) => {
    onSubmit?.(data);
  };

  return (
    <Form id={id} form={form} className="grid grid-cols-2 gap-3" onSubmit={handleSubmit}>
      <FormInput
        name="name"
        label={t("name")}
        fieldClass="col-span-2"
        required
        disabled={disabledFields?.name}
      />

      <FormInput name="description" label={t("description")} fieldClass="col-span-2" />

      <FormInputNumber
        name="initialBalance"
        label={t("initialBalance")}
        required
        disabled={disabledFields?.initialBalance}
      />
      <FormSelect
        name="currency"
        label={t("currency")}
        fieldClass="flex-1"
        required
        disabled={disabledFields?.currency}
        options={CURRENCY_OPTIONS}
      />

      {errorMsg ? <Message preset="error" className="col-span-2" message={errorMsg} /> : null}
    </Form>
  );
}
