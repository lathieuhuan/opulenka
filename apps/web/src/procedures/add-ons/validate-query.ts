import { COMMON_ERRORS, ErrorResponse } from "@opulenka/service";
import { NextRequest } from "next/server";
import { z } from "zod";

import { parseSearchParams } from "@/lib/utils/parsers";
import { RequestInterceptor } from "../procedure";

export function validateQuery<TSchema extends z.ZodType, TPreContext = void>(
  schema: TSchema,
  defaultQuery?: Record<string, any>,
): RequestInterceptor<{ query: z.infer<TSchema> } & TPreContext, TPreContext> {
  return async (request: NextRequest, ctx: TPreContext) => {
    const searchParams = request.nextUrl.searchParams;
    const query = parseSearchParams(searchParams, defaultQuery);

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
