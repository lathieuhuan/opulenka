import { useQuery } from "@tanstack/react-query";

import { ObjectUtils } from "@/lib/utils/object-utils";
import { getTransactions, GetTransactionsParams } from "@/services/transaction-service";
import { UseCustomQueryOptions } from "@/types/utils";
import { TransactionDTO } from "@opulenka/service";
import { TRANSACTIONS_QUERY_KEY } from "./config";

export function useTransactions<TData = TransactionDTO[]>(
  params: GetTransactionsParams,
  options?: UseCustomQueryOptions<TransactionDTO[], TData>,
) {
  return useQuery({
    ...options,
    queryKey: [TRANSACTIONS_QUERY_KEY, params],
    queryFn: () => getTransactions(params),
    enabled: !ObjectUtils.isEmpty(params) && options?.enabled !== false,
  });
}
