import { ErrorResponse, COMMON_ERRORS } from "@opulenka/service";
import { NextRequest } from "next/server";
import { z } from "zod";

import { RequestInterceptor } from "../procedure";
import { BaseContext } from "../base-procedure";

export function validateSegments<
  TSchema extends z.ZodType,
  TPreContext extends BaseContext = BaseContext,
>(schema: TSchema): RequestInterceptor<{ segments: z.infer<TSchema> } & TPreContext, TPreContext> {
  return async (request: NextRequest, ctx: TPreContext) => {
    const segments = await ctx.params;
    const { success, data, error } = schema.safeParse(segments);

    if (success) {
      return {
        ...ctx,
        segments: data,
      };
    }

    return new ErrorResponse(404, COMMON_ERRORS.NOT_FOUND);
  };
}
