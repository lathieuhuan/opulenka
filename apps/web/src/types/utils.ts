import { ErrorResponse } from "@opulenka/service";
import { QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { FieldValues, UseFormProps } from "react-hook-form";

export type UseFormValues<T extends FieldValues> = UseFormProps<T>["values"];

export type FormDisabledFields<T extends FieldValues> = Partial<Record<keyof T, boolean>>;

export type UseCustomQueryOptions<
  TData,
  TTransform = TData,
  TError = ErrorResponse,
  TQueryKey extends QueryKey = readonly unknown[],
> = Omit<UseQueryOptions<TData, TError, TTransform, TQueryKey>, "queryKey" | "queryFn">;
