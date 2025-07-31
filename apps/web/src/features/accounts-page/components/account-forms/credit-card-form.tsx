"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";
import { useTranslations } from "next-intl";

import {
  CreateCreditCardSchema,
  createCreditCardSchema,
} from "@/validation-schemas/account-schemas";
import { ECurrency } from "@opulenka/service";
import { CURRENCY_OPTIONS } from "../../constants/options";

// Components
import { Form, FormInput, FormInputNumber, FormSelect } from "@/components/form";
import { Message } from "@/lib/components/message";

export type CreditCardFormValues = CreateCreditCardSchema;

type CreditCardFormProps = {
  id?: string;
  values?: UseFormProps<CreditCardFormValues>["values"];
  disabledFields?: Partial<Record<keyof CreditCardFormValues, boolean>>;
  errorMsg?: string;
  onSubmit?: (data: CreditCardFormValues) => void;
};

export function CreditCardForm({
  id,
  values,
  disabledFields,
  errorMsg,
  onSubmit,
}: CreditCardFormProps) {
  const t = useTranslations("AccountForms");
  const form = useForm({
    resolver: zodResolver(createCreditCardSchema),
    defaultValues: {
      currency: ECurrency.VND,
      initialBalance: 0,
      limit: 0,
    },
    values,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const handleSubmit = async (data: CreditCardFormValues) => {
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

      <FormInput
        name="serviceProvider"
        label={t("serviceProvider")}
        required
        disabled={disabledFields?.serviceProvider}
      />
      <FormInput
        name="accountNumber"
        label={t("cardNumber")}
        disabled={disabledFields?.accountNumber}
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

      <FormInputNumber
        name="limit"
        label={t("creditLimit")}
        fieldClass="col-span-2"
        required
        disabled={disabledFields?.limit}
      />

      {errorMsg ? <Message preset="error" className="col-span-2" message={errorMsg} /> : null}
    </Form>
  );
} 