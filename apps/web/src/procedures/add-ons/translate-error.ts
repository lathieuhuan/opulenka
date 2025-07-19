import { ErrorResponse } from "@opulenka/service";
import { getTranslations } from "next-intl/server";
import { ResponseInterceptor } from "../procedure";

export function translateError(namespace: string): ResponseInterceptor {
  return async (response) => {
    if (response instanceof ErrorResponse) {
      const t = await getTranslations(namespace);
      response.message = t(response.message);
    }
  };
}
