import { ErrorResponse, COMMON_ERRORS } from "@opulenka/service";
import { NextRequest } from "next/server";
import { z } from "zod";

import { RequestInterceptor } from "../procedure";

export function validateBody<TSchema extends z.ZodType, TPreContext = void>(
  schema: TSchema,
): RequestInterceptor<{ body: z.infer<TSchema> } & TPreContext, TPreContext> {
  //
  return async (request: NextRequest, ctx: TPreContext) => {
    const contentType = request.headers.get("Content-Type");

    if (contentType !== "application/json") {
      return new ErrorResponse(400, COMMON_ERRORS.BAD_REQUEST);
    }
    const body = await request.json();
    const { success, data, error } = schema.safeParse(body);

    if (success) {
      return {
        ...ctx,
        body: data,
      };
    }

    return new ErrorResponse(400, COMMON_ERRORS.BAD_REQUEST);
  };
}
