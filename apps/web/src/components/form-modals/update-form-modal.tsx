import {
  MutationFunction,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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

export type UpdateFormModalProps<TFormProps, TValues> = {
  title: string;
  open: boolean;
  defaultErrorMsg?: string;
  queryKey: QueryKey;
  queryFn: () => Promise<TValues>;
  formProps?: Omit<TFormProps, keyof FormProps>;
  Form: ComponentType<TFormProps>;
  updateFn: MutationFunction<unknown, TValues>;
  onSuccess?: () => void;
  onError?: (error: ErrorResponse) => void;
  onClose: () => void;
};

export function UpdateFormModal<
  TForm extends ComponentType,
  TFormProps extends ComponentProps<TForm>,
  TValues = ValuesOfForm<TForm>,
>({
  title,
  open,
  defaultErrorMsg,
  queryKey,
  queryFn,
  formProps,
  Form,
  updateFn,
  onSuccess,
  onError,
  onClose,
}: UpdateFormModalProps<TFormProps, TValues>) {
  const formId = useId();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn,
    enabled: open,
  });

  const {
    mutate: tryUpdate,
    isError,
    isSuccess,
    isPending,
    reset,
  } = useMutation<unknown, ErrorResponse, TValues>({
    mutationFn: updateFn,
    onSuccess,
    onError,
  });

  const handleAfterClose = () => {
    reset();

    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey });
    }
  };

  const props: FormProps<TValues> = {
    id: formId,
    values: data,
    errorMsg: isError ? defaultErrorMsg : undefined,
    onSubmit: tryUpdate,
  };

  return (
    <Modal
      title={title}
      isActive={open}
      isLoading={isPending || isLoading}
      confirmBtnProps={{
        form: formId,
        type: "submit",
        disabled: isPending,
      }}
      afterClose={handleAfterClose}
      onClose={onClose}
    >
      <Form {...(props as TFormProps)} {...formProps} />
    </Modal>
  );
}
