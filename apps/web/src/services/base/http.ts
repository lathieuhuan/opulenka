import { createTranslator } from "next-intl";
import { ErrorResponse, ServiceResponse, SuccessResponse } from "@opulenka/service";
import { DOMAIN } from "@/constants/config";
import { notifier } from "@/utils/notifier";
import { API_ERRORS, apiErrorsByLocale } from "./api-errors";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RetryConfig = boolean | number | ((error: ErrorResponse, doneRetries: number) => boolean);

export type RequestConfig = Omit<RequestInit, "body"> & {
  params?: Record<string | number, any>;
  retry?: RetryConfig;
  retryDelay?: number;
  useDefaultRetry?: boolean;
};

function makeHttp(baseUrl: string) {
  const NUM_OF_DEFAULT_RETRIES = 1;
  const DELAY_OF_DEFAULT_RETRY = 1000;

  let t: ReturnType<typeof createTranslator> | undefined;

  function mayRetry<TResponseData = any>(
    fetchFn: (retry: RetryConfig) => Promise<ServiceResponse<TResponseData>>,
    remainingDefaultRetries: number,
    retry: RetryConfig = 0,
    retryDelay = 1000,
    doneRetries = 0,
  ): Promise<ServiceResponse<TResponseData>> {
    //
    return fetchFn(retry).catch((error: ErrorResponse) => {
      // DEFAULT RETRY
      const shouldRetryByDefault = error.status === 503;

      if (shouldRetryByDefault) {
        if (remainingDefaultRetries > 0) {
          return new Promise((resolve) =>
            setTimeout(() => {
              resolve(
                mayRetry(fetchFn, remainingDefaultRetries - 1, retry, retryDelay, doneRetries + 1),
              );
            }, DELAY_OF_DEFAULT_RETRY),
          );
        }

        let message = t && error.message in API_ERRORS ? t(error.message) : error.message;
        notifier.notify(message, "error");

        return new SuccessResponse(undefined);
      }

      // CUSTOM RETRY
      let shouldRetry: boolean;
      let nextRetry: RetryConfig;

      switch (typeof retry) {
        case "boolean":
          shouldRetry = nextRetry = retry;
          break;
        case "number":
          shouldRetry = retry > 0;
          nextRetry = retry - 1;
          break;
        case "function":
          shouldRetry = retry(error, doneRetries);
          nextRetry = retry;
          break;
      }

      if (shouldRetry) {
        return new Promise((resolve) =>
          setTimeout(() => {
            resolve(
              mayRetry(fetchFn, remainingDefaultRetries, nextRetry, retryDelay, doneRetries + 1),
            );
          }, retryDelay),
        );
      }

      if (t && error.message in API_ERRORS) {
        error.message = t(error.message);
      }

      return Promise.reject(error);
    });
  }

  async function _fetch<TResponseData = any>(
    url: string,
    requestInit: RequestInit,
  ): Promise<ServiceResponse<TResponseData>> {
    //
    return fetch(url, requestInit)
      .then(async (response) => {
        if (response.ok) {
          const parsed: SuccessResponse<any> = await response.json();
          return new SuccessResponse(parsed.data, parsed.status, parsed.message);
        }

        const parsed: ErrorResponse = await response.json();
        throw new ErrorResponse(parsed.status, parsed.message, parsed.detail);
      })
      .catch(async (error) => {
        if (error.message === "Failed to fetch") {
          throw new ErrorResponse(503, API_ERRORS.CONNECTION_ERROR);
        }

        throw error;
      });
  }

  function request<TResponseData = any>(
    method: Method,
    path: string,
    {
      retry,
      retryDelay,
      useDefaultRetry = true,
      headers,
      params,
      body,
      ...fetchConfig
    }: RequestConfig & {
      body?: Record<string | number, any>;
    } = {},
  ) {
    const queryParams = params ? `?${new URLSearchParams(params).toString()}` : "";
    const url = `${baseUrl}${path}${queryParams}`;
    const requestInit: RequestInit = {
      method,
      ...fetchConfig,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    return mayRetry<TResponseData>(
      () => _fetch<TResponseData>(url, requestInit),
      useDefaultRetry ? NUM_OF_DEFAULT_RETRIES : 0,
      retry,
      retryDelay,
    );
  }

  return {
    request,
    setLocale: (locale: string) => {
      t = createTranslator({
        locale,
        messages: apiErrorsByLocale[locale],
      });
    },
  };
}

export const http = makeHttp(`${DOMAIN}/api`);
