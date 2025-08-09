import { z } from "zod";

import { ObjectUtils } from "@/lib/utils/object-utils";
import { addUserInfo, translateError, validateBody, validateSegments } from "@/procedures/add-ons";
import { baseProcedure } from "@/procedures/base-procedure";
import { updateTransactionSchema } from "@/validation-schemas/transaction-schemas";
import { COMMON_ERRORS, ErrorResponse } from "@opulenka/service";

const segmentSchema = z.object({
  transactionId: z.string().transform((value) => Number(value)),
});

export const GET = baseProcedure
  .interceptRequest(addUserInfo())
  .interceptRequest(validateSegments(segmentSchema))
  .interceptResponse(translateError("TransactionServiceErrors"))
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.transaction.getTransactionById({
      id: ctx.segments.transactionId,
    });
    return response;
  });

export const PUT = baseProcedure
  .interceptRequest(addUserInfo())
  .interceptRequest(validateSegments(segmentSchema))
  .interceptRequest(validateBody(updateTransactionSchema))
  .interceptResponse(translateError("TransactionServiceErrors"))
  .createHandler(async (_, ctx) => {
    if (ObjectUtils.isEmpty(ctx.body)) {
      return new ErrorResponse(400, COMMON_ERRORS.BAD_REQUEST);
    }
    const response = await ctx.service.transaction.updateTransaction({
      id: ctx.segments.transactionId,
      data: ctx.body,
    });
    return response;
  });

export const DELETE = baseProcedure
  .interceptRequest(addUserInfo())
  .interceptRequest(validateSegments(segmentSchema))
  .interceptResponse(translateError("TransactionServiceErrors"))
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.transaction.deleteTransaction({
      id: ctx.segments.transactionId,
    });
    return response;
  });
