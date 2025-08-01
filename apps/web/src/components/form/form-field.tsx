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
  PathValue,
} from "react-hook-form";

import { ErrorDecoder } from "@/config/zod";
import { Label } from "@/lib/components/label";
import { cn } from "@/lib/utils/functions";
import { DEFAULT_PLACEHOLDER } from "./configs";

type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control?: Control<TFieldValues, any>;
  name: TName;
  label?: string;
  required?: boolean;
  className?: ClassValue;
  children:
    | React.JSX.Element
    | ((
        field: ControllerRenderProps<TFieldValues, TName>,
        fieldState: ControllerFieldState,
      ) => React.JSX.Element);
  /**
   * Transform value given by the child component before transferring it to the form control.
   * Currently used for this corner case on InputNumber:
   * 1. InputNumber onValueChange is passed undefined whenever the value is cleared.
   * 2. But react-hook-form does not want undefined values, it changes the value back to default value in this case.
   * 3. So when FormField is used with InputNumber, undefined should be transformed to empty string.
   * If zod is used in this corner case, it should use custom validation and/or transform.
   */
  transformValue?: (value: any) => PathValue<TFieldValues, TName>;
};

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  required,
  className,
  children,
  transformValue,
}: FormFieldProps<TFieldValues, TName>) {
  const id = useId();
  const t = useTranslations("FormField");
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
          const { onChange, ...rest } = field;
          const mergedProps = Object.assign(
            {
              onValueChange: (value: any) => {
                onChange(transformValue ? transformValue(value) : value);
              },
            },
            children.props,
            rest,
          );

          if (mergedProps.placeholder && mergedProps.placeholder in DEFAULT_PLACEHOLDER) {
            mergedProps.placeholder = t(mergedProps.placeholder);
          }

          controlChild = cloneElement(children, mergedProps);
        }

        return (
          <div
            id={id}
            data-slot="form-item"
            className={cn("mb-5 flex flex-col gap-2 relative", className)}
          >
            {label ? (
              <Label
                htmlFor={formItemId}
                data-slot="form-label"
                data-error={!!error}
                data-disabled={controlChild.props.disabled}
                className="data-[error=true]:text-error data-[disabled=true]:text-muted-foreground"
              >
                {label}
                {required && <span className="text-destructive">*</span>}
              </Label>
            ) : null}
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
