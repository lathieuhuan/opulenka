import { addUserInfo, translateError, validateBody } from "@/procedures/add-ons";
import { baseProcedure } from "@/procedures/base-procedure";
import { createCreditCardSchema } from "@/validation-schemas/account-schemas";
import { EAccountType } from "@opulenka/service";

export const POST = baseProcedure
  .interceptRequest(validateBody(createCreditCardSchema))
  .interceptRequest(addUserInfo())
  .interceptResponse(translateError("AccountServiceErrors"))
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.createCreditCard({
      ...ctx.body,
      type: EAccountType.CREDIT_CARD,
      userId: ctx.user.userId,
    });
    return response;
  });

export const GET = baseProcedure
  .interceptRequest(addUserInfo())
  .interceptResponse(translateError("AccountServiceErrors"))
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.getCreditCards({
      userId: ctx.user.userId,
    });
    return response;
  }); 