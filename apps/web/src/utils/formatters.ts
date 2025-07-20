export function formatCurrency(
  amount: number,
  currency = "USD",
  options?: Intl.NumberFormatOptions,
): string {
  const defaultOptions: Intl.NumberFormatOptions = {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  const formatter = new Intl.NumberFormat("en-US", { ...defaultOptions, ...options });
  return formatter.format(amount);
}
