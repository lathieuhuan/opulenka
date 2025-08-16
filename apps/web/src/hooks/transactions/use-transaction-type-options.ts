import { useTranslations } from "next-intl";

import { transactionTypeMap } from "@/constants/enum-maps";
import { SelectOption } from "@/lib/components/select";
import { ETransactionType } from "@opulenka/service";

export function useTransactionTypeOptions(): SelectOption[] {
  const tC = useTranslations("Common");

  return Object.values(ETransactionType).map((type) => ({
    label: tC(transactionTypeMap[type]),
    value: type,
  }));
}
