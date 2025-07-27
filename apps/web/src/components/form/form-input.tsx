import { ClassValue } from "clsx";
import { Input, InputProps } from "@/lib/components/input";
import { FormField } from "./form-field";

type FormInputProps = InputProps & {
  name: string;
  label?: string;
  required?: boolean;
  fieldClass?: ClassValue;
};

export function FormInput({ name, label, required, fieldClass, ...props }: FormInputProps) {
  return (
    <FormField name={name} label={label} className={fieldClass} required={required}>
      <Input {...props} />
    </FormField>
  );
}
