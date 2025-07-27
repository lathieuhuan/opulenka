import { ClassValue } from "clsx";
import { Input, InputProps } from "@/lib/components/input";
import { FormField } from "./form-field";
import { DEFAULT_PLACEHOLDER } from "./configs";

type FormInputProps = InputProps & {
  name: string;
  label?: string;
  required?: boolean;
  fieldClass?: ClassValue;
};

export function FormInput({ name, label, required, fieldClass, ...props }: FormInputProps) {
  return (
    <FormField name={name} label={label} className={fieldClass} required={required}>
      <Input placeholder={DEFAULT_PLACEHOLDER.__Enter} {...props} />
    </FormField>
  );
}
