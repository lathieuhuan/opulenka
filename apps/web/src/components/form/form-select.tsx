import { ClassValue } from "clsx";
import { Select, SelectProps } from "@/lib/components/select";
import { FormField } from "./form-field";

type FormSelectProps = SelectProps & {
  name: string;
  label?: string;
  required?: boolean;
  fieldClass?: ClassValue;
};

export function FormSelect({ name, label, required, fieldClass, ...props }: FormSelectProps) {
  return (
    <FormField name={name} label={label} className={fieldClass} required={required}>
      <Select block {...props} />
    </FormField>
  );
}
