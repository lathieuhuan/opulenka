import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

import { Input, InputProps } from "./input";

export interface InputNumberProps
  extends Omit<NumericFormatProps, "value" | "onChange" | "onValueChange"> {
  stepper?: number;
  thousandSeparator?: string;
  placeholder?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  value?: number; // Controlled value
  suffix?: string;
  prefix?: string;
  fixedDecimalScale?: boolean;
  decimalScale?: number;
  onValueChange?: (value: number | undefined) => void;
}

type Ref = HTMLInputElement | ((ref: HTMLInputElement) => void);

export const InputNumber = forwardRef<Ref, InputNumberProps>(
  (
    {
      stepper,
      thousandSeparator = ",",
      placeholder,
      defaultValue,
      min = -Infinity,
      max = Infinity,
      fixedDecimalScale = false,
      decimalScale = 0,
      suffix,
      prefix,
      value: controlledValue,
      onBlur,
      onValueChange,
      ...props
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLInputElement>(null);

    const getInputRef = (el: HTMLInputElement) => {
      internalRef.current = el;

      if (typeof ref === "function") {
        ref(el);
      } else if (ref) {
        ref.current = el;
      }
    };

    const [value, setValue] = useState<number | undefined | null | string>(
      controlledValue ?? defaultValue,
    );

    // const handleIncrement = useCallback(() => {
    //   setValue((prev) =>
    //     prev === undefined ? (stepper ?? 1) : Math.min(prev + (stepper ?? 1), max),
    //   );
    // }, [stepper, max]);

    // const handleDecrement = useCallback(() => {
    //   setValue((prev) =>
    //     prev === undefined ? -(stepper ?? 1) : Math.max(prev - (stepper ?? 1), min),
    //   );
    // }, [stepper, min]);

    // useEffect(() => {
    //   const handleKeyDown = (e: KeyboardEvent) => {
    //     if (document.activeElement === (internalRef as React.RefObject<HTMLInputElement>).current) {
    //       if (e.key === "ArrowUp") {
    //         handleIncrement();
    //       } else if (e.key === "ArrowDown") {
    //         handleDecrement();
    //       }
    //     }
    //   };

    //   window.addEventListener("keydown", handleKeyDown);

    //   return () => {
    //     window.removeEventListener("keydown", handleKeyDown);
    //   };
    // }, [handleIncrement, handleDecrement, internalRef]);

    useEffect(() => {
      if (controlledValue !== undefined && controlledValue !== value) {
        setValue(controlledValue);
      }
    }, [controlledValue]);

    const handleChange = (values: { value: string; floatValue: number | undefined }) => {
      setValue(values.floatValue);
      onValueChange?.(values.floatValue);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (value !== undefined && typeof value === "number") {
        if (value < min) {
          setValue(min);
          internalRef.current!.value = String(min);
        } else if (value > max) {
          setValue(max);
          internalRef.current!.value = String(max);
        }
      }

      onBlur?.(e);
    };

    const customInput = useCallback((props: InputProps) => {
      return (
        <Input
          {...props}
          onValueChange={(value) => {
            if (value === "") {
              setValue("");
            }
          }}
        />
      );
    }, []);

    return (
      <NumericFormat
        value={value}
        onValueChange={handleChange}
        thousandSeparator={thousandSeparator}
        decimalScale={decimalScale}
        fixedDecimalScale={fixedDecimalScale}
        allowNegative={min < 0}
        valueIsNumericString
        onBlur={handleBlur}
        max={max}
        min={min}
        suffix={suffix}
        prefix={prefix}
        customInput={customInput}
        placeholder={placeholder}
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none relative"
        getInputRef={getInputRef}
        {...props}
      />
    );

    // return (
    //   <div className="flex items-center">
    //     <NumericFormat
    //       value={value}
    //       onValueChange={handleChange}
    //       thousandSeparator={thousandSeparator}
    //       decimalScale={decimalScale}
    //       fixedDecimalScale={fixedDecimalScale}
    //       allowNegative={min < 0}
    //       valueIsNumericString
    //       onBlur={handleBlur}
    //       max={max}
    //       min={min}
    //       suffix={suffix}
    //       prefix={prefix}
    //       customInput={Input}
    //       placeholder={placeholder}
    //       className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-r-none relative"
    //       getInputRef={getInputRef}
    //       {...props}
    //     />

    //     <div className="flex flex-col">
    //       <Button
    //         type="button"
    //         aria-label="Increase value"
    //         className="px-2 h-4 rounded-l-none rounded-br-none border-input border-l-0 border-b-[0.5px] focus-visible:relative"
    //         variant="outline"
    //         onClick={handleIncrement}
    //         disabled={value === max}
    //       >
    //         <ChevronUp size={15} />
    //       </Button>
    //       <Button
    //         type="button"
    //         aria-label="Decrease value"
    //         className="px-2 h-4 rounded-l-none rounded-tr-none border-input border-l-0 border-t-[0.5px] focus-visible:relative"
    //         variant="outline"
    //         onClick={handleDecrement}
    //         disabled={value === min}
    //       >
    //         <ChevronDown size={15} />
    //       </Button>
    //     </div>
    //   </div>
    // );
  },
);
