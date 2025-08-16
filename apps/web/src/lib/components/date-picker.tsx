"use client";

import { format } from "date-fns/format";
import { Calendar as CalendarIcon } from "lucide-react";
import { Ref, useRef } from "react";

import { useControllableState } from "../hooks/use-controllable-state";
import { cn } from "../utils/functions";

import { Calendar } from "@/lib/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/components/popover";
import { ClearButton } from "./clear-button";

export type DatePickerProps = {
  placeholder?: string;
  value?: Date;
  initialValue?: Date;
  disabled?: boolean;
  allowClear?: boolean;
  onChange?: (date?: Date) => void;
  onValueChange?: (date?: Date | string) => void;
  // injectable by FormField
  id?: string;
  name?: string;
  "data-slot"?: string;
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
};

export function DatePicker({
  placeholder = "Pick",
  value,
  initialValue,
  disabled,
  allowClear = true,
  onChange,
  onValueChange,
  ...rest
}: DatePickerProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [date, setDate] = useControllableState<Date | string | undefined>({
    prop: value || "",
    defaultProp: initialValue || "",
    onChange: (date) => {
      onValueChange?.(date);
    },
  });
  const clearable = Boolean(allowClear && date && !disabled);
  const _value = date instanceof Date ? date : undefined;

  const handleSelect = (date: Date | undefined) => {
    setDate(date);
    onChange?.(date);

    if (date) {
      ref.current?.click();
    }
  };

  const handleClear = () => {
    setDate("");
  };

  return (
    <div className="group/control relative [&_svg]:pointer-events-none" data-clearable={clearable}>
      <Popover>
        <PopoverTrigger ref={ref} asChild>
          <button
            data-empty={!date}
            type="button"
            disabled={disabled}
            className={cn(
              "w-full h-9 px-3 py-2 text-left text-sm font-normal inline-flex items-center justify-between gap-2 whitespace-nowrap rounded-md shadow-xs transition-all outline-none shrink-0",
              "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
              "dark:bg-input/30 dark:hover:not-disabled:bg-input/50 bg-transparent border border-input",
              "disabled:pointer-events-none disabled:opacity-50 data-[empty=true]:text-muted-foreground",
            )}
            {...rest}
          >
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
            <CalendarIcon className="size-4 shrink-0 group-data-[clearable=true]/control:group-hover/control:hidden" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={_value} onSelect={handleSelect} />
        </PopoverContent>
      </Popover>

      {clearable && (
        <ClearButton
          className="hidden group-data-[clearable=true]/control:group-hover/control:block"
          onClick={handleClear}
        />
      )}
    </div>
  );
}
