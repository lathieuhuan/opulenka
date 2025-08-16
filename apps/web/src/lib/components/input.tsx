"use client";

import { CircleX } from "lucide-react";
import { ChangeEvent, useRef } from "react";

import { cn, mergeRefs } from "@/lib/utils/functions";
import { useControllableState } from "../hooks/use-controllable-state";
import { Button, type ButtonProps } from "./button";
import { InputBase } from "./input-base";

// self-made

type InputProps = Omit<React.ComponentProps<"input">, "value" | "defaultValue"> & {
  value?: string;
  defaultValue?: string;
  action?: ButtonProps;
  allowClear?: boolean;
  onValueChange?: (value: string) => void; // for FormField integration
};

function Input({
  className,
  ref: externalRef,
  allowClear = true,
  action,
  value,
  disabled,
  onChange,
  onValueChange,
  ...baseProps
}: InputProps) {
  const [_value, _setValue] = useControllableState({
    prop: value,
    defaultProp: baseProps.defaultValue ?? "",
    onChange: (value) => {
      onValueChange?.(value);
    },
  });
  const internalRef = useRef<HTMLInputElement>(null);
  const showClearBtn = Boolean(allowClear && _value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    _setValue?.(e.target.value);
  };

  const onClickClear = () => {
    _setValue?.("");
    internalRef.current?.focus();
  };

  const renderInput = (cls?: string) => (
    <div className={cn("relative flex w-full items-center", disabled && "cursor-not-allowed")}>
      <InputBase
        className={cn(showClearBtn && "pr-10", cls, className)}
        ref={mergeRefs(internalRef, externalRef)}
        value={_value}
        disabled={disabled}
        onChange={handleChange}
        {...baseProps}
      />
      {showClearBtn && !disabled ? (
        <button
          type="button"
          className="absolute right-2 size-6 flex items-center justify-center text-muted-foreground hover:text-destructive"
          tabIndex={-1}
          onClick={onClickClear}
        >
          <CircleX size={20} />
        </button>
      ) : null}
    </div>
  );

  if (action) {
    return (
      <div className="relative flex w-full items-center">
        {renderInput("rounded-r-none")}
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          {...action}
          className={cn(
            "bg-transparent dark:bg-input/30 border-input rounded-l-none",
            action.className,
          )}
        />
      </div>
    );
  }

  return renderInput();
}

export { Input, type InputProps };
