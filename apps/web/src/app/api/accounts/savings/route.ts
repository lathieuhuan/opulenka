import { addUserInfo, validateBody } from "@/procedures/add-ons";
import { baseProcedure } from "@/procedures/base-procedure";
import { createSavingsAccountSchema } from "@/validation-schemas/account-schemas";
import { EAccountType } from "@opulenka/service";

export const POST = baseProcedure
  .interceptRequest(validateBody(createSavingsAccountSchema))
  .interceptRequest(addUserInfo())
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.createSavingsAccount({
      ...ctx.body,
      userId: ctx.user.userId,
      type: EAccountType.SAVINGS,
    });
    return response;
  }); 