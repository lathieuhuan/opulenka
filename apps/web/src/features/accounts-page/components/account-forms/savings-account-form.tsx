"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";

import {
  CreateSavingsAccountSchema,
  createSavingsAccountSchema,
} from "@/validation-schemas/account-schemas";
import { ECurrency } from "@opulenka/service";
import { CURRENCY_OPTIONS } from "../../constants/options";

// Components
import { Form, FormInput, FormInputNumber, FormSelect } from "@/components/form";
import { Message } from "@/lib/components/message";

export type SavingsAccountFormValues = CreateSavingsAccountSchema;

type SavingsAccountFormProps = {
  id?: string;
  values?: UseFormProps<SavingsAccountFormValues>["values"];
  disabledFields?: Partial<Record<keyof SavingsAccountFormValues, boolean>>;
  errorMsg?: string;
  onSubmit?: (data: SavingsAccountFormValues) => void;
};

export function SavingsAccountForm({
  id,
  values,
  disabledFields,
  errorMsg,
  onSubmit,
}: SavingsAccountFormProps) {
  const form = useForm({
    resolver: zodResolver(createSavingsAccountSchema),
    defaultValues: {
      currency: ECurrency.VND,
      initialBalance: 0,
      interestRate: 0,
    },
    values,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const handleSubmit = async (data: SavingsAccountFormValues) => {
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
        options={CURRENCY_OPTIONS}
        required
        disabled={disabledFields?.currency}
      />

      <FormInputNumber
        name="interestRate"
        label="Interest Rate"
        required
        suffix="%"
        decimalScale={2}
        min={0}
        max={100}
        disabled={disabledFields?.interestRate}
      />

      {errorMsg && <Message preset="error" className="col-span-2" message={errorMsg} />}
    </Form>
  );
} 