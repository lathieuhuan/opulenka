import { addUserInfo, validateBody } from "@/procedures/add-ons";
import { baseProcedure } from "@/procedures/base-procedure";
import { createCashAccountSchema } from "@/validation-schemas/account-schemas";

export const POST = baseProcedure
  .interceptRequest(validateBody(createCashAccountSchema))
  .interceptRequest(addUserInfo())
  // .interceptResponse(translateError("AuthServiceErrors"))
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.createAccount({
      ...ctx.body,
      userId: ctx.user.userId,
    });
    return response;
  });
