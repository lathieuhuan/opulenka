import { z } from "zod";

import { addUserInfo, validateBody, validateSegments } from "@/procedures/add-ons";
import { baseProcedure } from "@/procedures/base-procedure";
import { updateInvestmentAccountSchema } from "@/validation-schemas/account-schemas";

export const GET = baseProcedure
  .interceptRequest(validateSegments(z.object({ accountId: z.coerce.number() })))
  .interceptRequest(addUserInfo())
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.getInvestmentAccountById({
      userId: ctx.user.userId,
      id: ctx.segments.accountId,
    });
    return response;
  });

export const PUT = baseProcedure
  .interceptRequest(validateSegments(z.object({ accountId: z.coerce.number() })))
  .interceptRequest(validateBody(updateInvestmentAccountSchema))
  .interceptRequest(addUserInfo())
  // .interceptResponse(translateError("AuthServiceErrors"))
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.updateInvestmentAccount({
      id: ctx.segments.accountId,
      data: ctx.body,
    });
    return response;
  }); 