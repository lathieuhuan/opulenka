import { z } from "zod";

import { addUserInfo, translateError, validateBody, validateSegments } from "@/procedures/add-ons";
import { baseProcedure } from "@/procedures/base-procedure";
import { updateSavingsAccountSchema } from "@/validation-schemas/account-schemas";

export const GET = baseProcedure
  .interceptRequest(validateSegments(z.object({ accountId: z.coerce.number() })))
  .interceptRequest(addUserInfo())
  .interceptResponse(translateError("AccountServiceErrors"))
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.getSavingsAccountById({
      userId: ctx.user.userId,
      id: ctx.segments.accountId,
    });
    return response;
  });

export const PUT = baseProcedure
  .interceptRequest(validateSegments(z.object({ accountId: z.coerce.number() })))
  .interceptRequest(validateBody(updateSavingsAccountSchema))
  .interceptRequest(addUserInfo())
  .interceptResponse(translateError("AccountServiceErrors"))
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.updateSavingsAccount({
      id: ctx.segments.accountId,
      data: ctx.body,
    });
    return response;
  });

export const DELETE = baseProcedure
  .interceptRequest(validateSegments(z.object({ accountId: z.coerce.number() })))
  .interceptRequest(addUserInfo())
  .interceptResponse(translateError("AccountServiceErrors"))
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.deleteSavingsAccount({
      id: ctx.segments.accountId,
    });
    return response;
  }); 