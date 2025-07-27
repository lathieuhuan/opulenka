import { FormProvider, UseFormReturn, type FieldValues } from "react-hook-form";

export const Form = <TFieldValues extends FieldValues = FieldValues>({
  form,
  id,
  className,
  children,
  onSubmit,
}: {
  form: UseFormReturn<TFieldValues>;
  id?: string;
  className?: string;
  children: React.ReactNode;
  onSubmit: (data: TFieldValues) => void;
}) => {
  return (
    <FormProvider {...form}>
      <form id={id} onSubmit={form.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};
