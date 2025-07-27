import { ClassValue } from "clsx";
import { InputNumber, InputNumberProps } from "@/lib/components/input-number";
import { FormField } from "./form-field";

type FormInputNumberProps = InputNumberProps & {
  name: string;
  label?: string;
  required?: boolean;
  fieldClass?: ClassValue;
};

export function FormInputNumber({
  name,
  label,
  required,
  fieldClass,
  ...props
}: FormInputNumberProps) {
  return (
    <FormField
      name={name}
      label={label}
      className={fieldClass}
      required={required}
      transformValue={(val) => (val === undefined ? "" : val)}
    >
      <InputNumber {...props} />
    </FormField>
  );
}
