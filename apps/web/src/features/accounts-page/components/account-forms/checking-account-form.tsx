"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";

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
  values?: UseFormProps<CheckingAccountFormValues>["values"];
  disabledFields?: Partial<Record<keyof CheckingAccountFormValues, boolean>>;
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
  const form = useForm({
    resolver: zodResolver(createCheckingAccountSchema),
    defaultValues: {
      currency: ECurrency.VND,
      initialBalance: 0,
    },
    values,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const handleSubmit = async (data: CheckingAccountFormValues) => {
    onSubmit?.(data);
  };

  return (
    <Form id={id} form={form} className="grid grid-cols-2 gap-3" onSubmit={handleSubmit}>
      <FormInput
        name="name"
        label="Name"
        fieldClass="col-span-2"
        required
        disabled={disabledFields?.name}
      />

      <FormInput
        name="serviceProvider"
        label="Service Provider"
        required
        disabled={disabledFields?.serviceProvider}
      />

      <FormInput
        name="accountNumber"
        label="Account Number"
        disabled={disabledFields?.accountNumber}
      />

      <FormInput name="description" label="Description" fieldClass="col-span-2" />

      <FormInputNumber
        name="initialBalance"
        label="Initial Balance"
        required
        disabled={disabledFields?.initialBalance}
      />

      <FormSelect
        name="currency"
        label="Currency"
        fieldClass="flex-1"
        required
        disabled={disabledFields?.currency}
        options={CURRENCY_OPTIONS}
      />

      {errorMsg ? <Message preset="error" className="col-span-2" message={errorMsg} /> : null}
    </Form>
  );
} 