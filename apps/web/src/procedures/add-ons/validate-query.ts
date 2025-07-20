import { ErrorResponse, COMMON_ERRORS } from "@opulenka/service";
import { NextRequest } from "next/server";
import { z } from "zod";

import { RequestInterceptor } from "../procedure";

export function validateQuery<TQueryShape, TPreContext = void>(
  schema: z.ZodSchema<TQueryShape>,
  defaultQuery?: Record<string, any>,
): RequestInterceptor<{ query: TQueryShape } & TPreContext, TPreContext> {
  return async (request: NextRequest, ctx: TPreContext) => {
    const searchParams = request.nextUrl.searchParams;
    const query: Record<string, any> = {
      ...defaultQuery,
    };

    // Convert URLSearchParams to object and handle type conversion
    for (const [key, value] of searchParams.entries()) {
      // Convert numeric strings to numbers
      if (!isNaN(Number(value)) && value !== "") {
        query[key] = Number(value);
      } else {
        query[key] = value;
      }
    }

    const { success, data, error } = schema.safeParse(query);

    if (success) {
      return {
        ...ctx,
        query: data,
      };
    }

    return new ErrorResponse(400, COMMON_ERRORS.BAD_REQUEST);
  };
}
