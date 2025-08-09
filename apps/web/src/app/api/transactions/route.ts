import { ObjectUtils } from "@/lib/utils/object-utils";
import { addUserInfo, translateError, validateBody, validateQuery } from "@/procedures/add-ons";
import { baseProcedure } from "@/procedures/base-procedure";
import { createTransactionSchema, getTransactionsSchema } from "@/validation-schemas/transaction-schemas";
import { COMMON_ERRORS, ErrorResponse } from "@opulenka/service";

export const GET = baseProcedure
  .interceptRequest(addUserInfo())
  .interceptRequest(validateQuery(getTransactionsSchema))
  .interceptResponse(translateError("TransactionServiceErrors"))
  .createHandler(async (_, ctx) => {
    if (ObjectUtils.isEmpty(ctx.query)) {
      return new ErrorResponse(400, COMMON_ERRORS.BAD_REQUEST);
    }
    const response = await ctx.service.transaction.getTransactions(ctx.query);
    return response;
  });

export const POST = baseProcedure
  .interceptRequest(addUserInfo())
  .interceptRequest(validateBody(createTransactionSchema))
  .interceptResponse(translateError("TransactionServiceErrors"))
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.transaction.createTransaction(ctx.body);
    return response;
  });
