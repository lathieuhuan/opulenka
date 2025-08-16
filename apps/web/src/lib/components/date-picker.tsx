"use client";

import { format } from "date-fns/format";
import { Calendar as CalendarIcon } from "lucide-react";

import { useControllableState } from "../hooks/use-controllable-state";

import { Button } from "@/lib/components/button";
import { Calendar } from "@/lib/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/components/popover";

export type DatePickerProps = {
  placeholder?: string;
  value?: Date;
  onChange?: (date?: Date) => void;
};

export function DatePicker({ placeholder = "Pick", value, onChange }: DatePickerProps) {
  const [date, setDate] = useControllableState({
    prop: value,
    defaultProp: undefined,
    onChange: (date) => {
      onChange?.(date);
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal"
        >
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
          <CalendarIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  );
}
