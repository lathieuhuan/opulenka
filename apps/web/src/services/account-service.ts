import { DataOf, GetAccountsResponse } from "@opulenka/service";
import { http, RequestConfig } from "./base/http";

export function getAccounts(config?: RequestConfig) {
  return http.request<GetAccountsResponse>("GET", "/accounts", {
    ...config,
  });
}

export type AccountFromGetAccounts = DataOf<GetAccountsResponse>[number];
