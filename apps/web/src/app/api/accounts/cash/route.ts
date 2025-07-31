import { addUserInfo, translateError, validateBody } from "@/procedures/add-ons";
import { baseProcedure } from "@/procedures/base-procedure";
import { createCashAccountSchema } from "@/validation-schemas/account-schemas";
import { EAccountType } from "@opulenka/service";

export const POST = baseProcedure
  .interceptRequest(validateBody(createCashAccountSchema))
  .interceptRequest(addUserInfo())
  .interceptResponse(translateError("AccountServiceErrors"))
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.createAccount({
      ...ctx.body,
      type: EAccountType.CASH,
      userId: ctx.user.userId,
    });
    return response;
  });
