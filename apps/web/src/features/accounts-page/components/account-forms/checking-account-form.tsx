"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import { USE_FORM_DEFAULT_PROPS } from "@/constants/features";
import { FormDisabledFields, UseFormValues } from "@/types/utils";
import {
  CreateCheckingAccountSchema,
  createCheckingAccountSchema,
} from "@/validation-schemas/account-schemas";
import { ECurrency } from "@opulenka/service";
import { CURRENCY_OPTIONS } from "../../constants/options";

// Components
import { Form, FormInput, FormInputNumber, FormSelect } from "@/components/form";
import { Message } from "@/lib/components/message";

export type CheckingAccountFormValues = CreateCheckingAccountSchema;

type CheckingAccountFormProps = {
  id?: string;
  values?: UseFormValues<CheckingAccountFormValues>;
  disabledFields?: FormDisabledFields<CheckingAccountFormValues>;
  errorMsg?: string;
  onSubmit?: (data: CheckingAccountFormValues) => void;
};

export function CheckingAccountForm({
  id,
  values,
  disabledFields,
  errorMsg,
  onSubmit,
}: CheckingAccountFormProps) {
  const t = useTranslations("AccountForms");
  const form = useForm({
    resolver: zodResolver(createCheckingAccountSchema),
    defaultValues: {
      currency: ECurrency.VND,
      initialBalance: 0,
    },
    values,
    ...USE_FORM_DEFAULT_PROPS,
  });

  const handleSubmit = async (data: CheckingAccountFormValues) => {
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
        label={t("accountNumber")}
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

      {errorMsg ? <Message preset="error" className="col-span-2" message={errorMsg} /> : null}
    </Form>
  );
}
