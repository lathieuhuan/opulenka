import { Slot } from "@radix-ui/react-slot";
import clsx, { type ClassValue } from "clsx";
import { useTranslations } from "next-intl";
import { cloneElement, useId } from "react";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import { ErrorDecoder } from "@/config/zod/error-processing";
import { Label } from "@/lib/components/label";
import { cn } from "@/lib/utils/functions";

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues, any>;
  name: TName;
  label: string;
  placeholder?: string;
  className?: ClassValue;
  children:
    | React.JSX.Element
    | ((
        field: ControllerRenderProps<TFieldValues, TName>,
        fieldState: ControllerFieldState,
      ) => React.JSX.Element);
};

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ control, name, label, className, children }: FormFieldProps<TFieldValues, TName>) {
  const id = useId();
  const t = useTranslations("FormErrors");
  const formItemId = `${id}-form-item`;
  const formMessageId = `${id}-form-item-message`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { error } = fieldState;
        let errorMsg = "";

        if (error?.message) {
          const decodedError = ErrorDecoder.decode(error.message);
          errorMsg = t(decodedError.key, decodedError.params);
        }

        let controlChild: React.JSX.Element | null = null;

        if (typeof children === "function") {
          controlChild = children(field, fieldState);
        } //
        else {
          const mergedProps = Object.assign(
            {
              onValueChange: (value: string) => {
                field.onChange(value);
              },
            },
            children.props,
            field,
          );

          controlChild = cloneElement(children, mergedProps);
        }

        return (
          <div
            id={id}
            data-slot="form-item"
            className={cn("mb-5 flex flex-col gap-1.5 relative", className)}
          >
            <Label
              htmlFor={formItemId}
              data-slot="form-label"
              data-error={!!error}
              className="data-[error=true]:text-error"
            >
              {label}
            </Label>
            <Slot
              id={formItemId}
              data-slot="form-control"
              aria-describedby={clsx(`${id}-form-item-description`, error ? formMessageId : "")}
              aria-invalid={!!error}
            >
              {controlChild}
            </Slot>
            {/* <FormDescription>This is your public display name.</FormDescription> */}
            <p
              id={formMessageId}
              data-slot="form-message"
              className="absolute top-full mt-0.5 text-destructive text-xs"
            >
              {errorMsg}
            </p>
          </div>
        );
      }}
    />
  );
}
