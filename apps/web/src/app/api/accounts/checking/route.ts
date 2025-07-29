import { addUserInfo, validateBody } from "@/procedures/add-ons";
import { baseProcedure } from "@/procedures/base-procedure";
import { createCheckingAccountSchema } from "@/validation-schemas/account-schemas";
import { EAccountType } from "@opulenka/service";

export const POST = baseProcedure
  .interceptRequest(validateBody(createCheckingAccountSchema))
  .interceptRequest(addUserInfo())
  // .interceptResponse(translateError("AuthServiceErrors"))
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.createAccount({
      ...ctx.body,
      userId: ctx.user.userId,
      type: EAccountType.CHECKING,
    });
    return response;
  }); 