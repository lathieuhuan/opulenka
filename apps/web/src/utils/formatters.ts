import { ECurrency } from "@opulenka/service";

export function formatAmount(
  amount: number,
  currency: ECurrency,
  options?: Intl.NumberFormatOptions,
): string {
  const fractionDigits = currency === ECurrency.VND ? 0 : 2;

  const defaultOptions: Intl.NumberFormatOptions = {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  };

  const formatter = new Intl.NumberFormat("en-US", { ...defaultOptions, ...options });
  return formatter.format(amount);
}
