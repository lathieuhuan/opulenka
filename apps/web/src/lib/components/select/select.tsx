"use client";
import { CircleX } from "lucide-react";

import { useControllableState } from "@/lib/hooks/use-controllable-state";
import { cn } from "@/lib/utils/functions";
import {
  SelectContainer,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type SelectTriggerProps,
} from "./components";

// modified

export type SelectOption<TValue = string | number> = {
  label: string;
  value: TValue;
};

export type SelectProps<TValue = string | number> = Omit<
  SelectTriggerProps,
  "value" | "children" | "arrowCls"
> & {
  options?: SelectOption<TValue>[];
  placeholder?: string;
  value?: TValue;
  defaultValue?: string;
  block?: boolean;
  allowClear?: boolean;
  onValueChange?: (value: TValue) => void;
};

export function Select({
  className,
  options = [],
  placeholder,
  value,
  defaultValue,
  block,
  allowClear,
  onValueChange,
  ...props
}: SelectProps) {
  const [_value, _setValue] = useControllableState({
    prop: value,
    defaultProp: defaultValue ?? "",
    onChange: (value) => {
      onValueChange?.(value);
    },
  });
  const isClearable = allowClear && !props.disabled && _value !== undefined && _value !== "";

  const handleClear = () => {
    _setValue("");
  };

  return (
    <SelectContainer value={_value} onValueChange={_setValue}>
      <div className="group relative" data-clearable={isClearable}>
        <SelectTrigger
          className={cn("w-full", className)}
          arrowCls="group-data-[clearable=true]:group-hover:hidden"
          {...props}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <span
          className="absolute z-50 right-2 top-1/2 -translate-y-1/2 size-6 rounded-full text-muted-foreground hover:text-destructive hidden group-data-[clearable=true]:group-hover:flex items-center justify-center"
          onClick={handleClear}
        >
          <CircleX className="size-5" />
        </span>
      </div>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectContainer>
  );
}
