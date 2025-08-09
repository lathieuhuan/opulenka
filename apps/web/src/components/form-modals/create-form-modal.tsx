import { MutationFunction, useMutation } from "@tanstack/react-query";
import { ComponentProps, ComponentType, useId } from "react";

import { Modal } from "@/lib/components/modal";
import { ErrorResponse } from "@opulenka/service";

type FormProps<TValues = unknown> = {
  id?: string;
  values?: TValues;
  errorMsg?: string;
  onSubmit?: (data: TValues) => void;
};

type ValuesOfForm<TForm extends ComponentType> =
  TForm extends ComponentType<infer TProps>
    ? TProps extends FormProps<infer TValues>
      ? TValues
      : never
    : never;

export type CreateFormModalProps<TFormProps, TValues> = {
  title: string;
  open: boolean;
  defaultErrorMsg?: string;
  formProps?: Omit<TFormProps, keyof FormProps>;
  Form: ComponentType<TFormProps>;
  createFn: MutationFunction<unknown, TValues>;
  onSuccess?: () => void;
  onError?: (error: ErrorResponse) => void;
  onClose: () => void;
};

export function CreateFormModal<
  TForm extends ComponentType,
  TFormProps extends ComponentProps<TForm>,
  TValues = ValuesOfForm<TForm>,
>({
  title,
  open,
  defaultErrorMsg,
  formProps,
  Form,
  createFn,
  onSuccess,
  onError,
  onClose,
}: CreateFormModalProps<TFormProps, TValues>) {
  const formId = useId();
  const {
    mutate: tryCreate,
    isError,
    isPending,
    reset,
  } = useMutation<unknown, ErrorResponse, TValues>({
    mutationFn: createFn,
    onSuccess,
    onError,
  });

  const props: FormProps<TValues> = {
    id: formId,
    errorMsg: isError ? defaultErrorMsg : undefined,
    onSubmit: tryCreate,
  };

  return (
    <Modal
      title={title}
      isActive={open}
      isLoading={isPending}
      confirmBtnProps={{
        form: formId,
        type: "submit",
        disabled: isPending,
      }}
      afterClose={reset}
      onClose={onClose}
    >
      <Form {...(props as TFormProps)} {...formProps} />
    </Modal>
  );
}
