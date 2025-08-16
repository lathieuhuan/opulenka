import { ClassValue } from "clsx";
import { FormField } from "./form-field";
import { DEFAULT_PLACEHOLDER } from "./configs";
import { DatePicker, DatePickerProps } from "@/lib/components/date-picker";

type FormDatePickerProps = DatePickerProps & {
  name: string;
  label?: string;
  required?: boolean;
  fieldClass?: ClassValue;
};

export function FormDatePicker({
  name,
  label,
  required,
  fieldClass,
  ...props
}: FormDatePickerProps) {
  return (
    <FormField name={name} label={label} className={fieldClass} required={required}>
      <DatePicker placeholder={DEFAULT_PLACEHOLDER.__Pick} {...props} />
    </FormField>
  );
}
