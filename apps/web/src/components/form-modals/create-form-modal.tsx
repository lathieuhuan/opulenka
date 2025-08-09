import { MutationFunction, useMutation } from "@tanstack/react-query";
import { ComponentType, useId } from "react";

import { Modal } from "@/lib/components/modal";
import { ErrorResponse } from "@opulenka/service";

type FormProps<TValues = unknown> = {
  id?: string;
  errorMsg?: string;
  onSubmit?: (data: TValues) => void;
};

type CreateFormModalProps<TValues = unknown> = {
  title: string;
  open: boolean;
  defaultErrorMsg?: string;
  Form: ComponentType<FormProps<TValues>>;
  createFn: MutationFunction<unknown, TValues>;
  onSuccess?: () => void;
  onError?: (error: ErrorResponse) => void;
  onClose: () => void;
};

export function CreateFormModal<TValues = unknown>({
  title,
  open,
  defaultErrorMsg,
  Form,
  createFn,
  onSuccess,
  onError,
  onClose,
}: CreateFormModalProps<TValues>) {
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
      <Form id={formId} errorMsg={isError ? defaultErrorMsg : undefined} onSubmit={tryCreate} />
    </Modal>
  );
}
