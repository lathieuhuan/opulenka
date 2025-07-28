import { addUserInfo, validateBody } from "@/procedures/add-ons";
import { baseProcedure } from "@/procedures/base-procedure";
import { createInvestmentAccountSchema } from "@/validation-schemas/account-schemas";
import { EAccountType } from "@opulenka/service";

export const POST = baseProcedure
  .interceptRequest(validateBody(createInvestmentAccountSchema))
  .interceptRequest(addUserInfo())
  // .interceptResponse(translateError("AuthServiceErrors"))
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.createInvestmentAccount({
      ...ctx.body,
      type: EAccountType.INVESTMENT,
      userId: ctx.user.userId,
    });
    return response;
  });
