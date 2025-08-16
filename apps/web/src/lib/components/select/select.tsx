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
import { ClearButton } from "../clear-button";

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
  const clearable = allowClear && !props.disabled && _value !== undefined && _value !== "";

  const handleClear = () => {
    _setValue("");
  };

  return (
    <SelectContainer value={_value} onValueChange={_setValue}>
      <div className="group/control relative" data-clearable={clearable}>
        <SelectTrigger
          className={cn("w-full", className)}
          arrowCls={"group-data-[clearable=true]/control:group-hover/control:hidden"}
          {...props}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <ClearButton
          className="hidden group-data-[clearable=true]/control:group-hover/control:block"
          onClick={handleClear}
        />
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
