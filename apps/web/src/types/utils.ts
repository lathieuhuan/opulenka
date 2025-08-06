import { FieldValues, UseFormProps } from "react-hook-form";

export type UseFormValues<T extends FieldValues> = UseFormProps<T>["values"];

export type FormDisabledFields<T extends FieldValues> = Partial<Record<keyof T, boolean>>;
