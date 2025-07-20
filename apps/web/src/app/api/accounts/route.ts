import { addUserInfo, translateError } from "@/procedures/add-ons";
import { baseProcedure } from "@/procedures/base-procedure";

export const GET = baseProcedure
  .interceptRequest(addUserInfo())
  .interceptResponse(translateError("AccountServiceErrors"))
  .createHandler(async (_, ctx) => {
    const response = await ctx.service.account.getAccounts({
      userId: ctx.user.userId,
    });
    return response;
  });
