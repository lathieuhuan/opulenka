import { currencyMap } from "@/constants/enum-maps";
import { SelectOption } from "@/lib/components/select";
import { ECurrency } from "@opulenka/service";

export const CURRENCY_OPTIONS: SelectOption[] = Object.values(ECurrency).map((currency) => ({
  label: currencyMap[currency] || currency,
  value: currency,
})) satisfies SelectOption[];
