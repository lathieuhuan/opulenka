import { CircleX } from "lucide-react";
import { useRef } from "react";

import { cn, mergeRefs } from "@/lib/utils/functions";
import { Button, type ButtonProps } from "./button";
import { InputBase } from "./input-base";

// self-made

type InputProps = Omit<React.ComponentProps<"input">, "onChange"> & {
  action?: ButtonProps;
  allowClear?: boolean;
  onValueChange?: (value?: string) => void;
};

function Input({
  className,
  ref: externalRef,
  allowClear = true,
  action,
  onValueChange,
  ...baseProps
}: InputProps) {
  const internalRef = useRef<HTMLInputElement>(null);
  const showClearBtn = Boolean(allowClear && baseProps.value);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.target.value);
  };

  const onClickClear = () => {
    onValueChange?.("");
    internalRef.current?.focus();
  };

  const renderInput = (cls?: string) => (
    <div className="relative flex w-full items-center">
      <InputBase
        className={cn(showClearBtn && "pr-10", cls, className)}
        ref={mergeRefs(internalRef, externalRef)}
        onChange={onChange}
        {...baseProps}
      />
      {showClearBtn ? (
        <button
          type="button"
          className="absolute right-2 size-6 flex items-center justify-center text-foreground hover:text-destructive opacity-60"
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
          {...action}
          className={cn("rounded-l-none", action.className)}
        />
      </div>
    );
  }

  return renderInput();
}

export { Input, type InputProps };
