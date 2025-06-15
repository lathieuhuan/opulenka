import { translateError, validateBody } from "@/procedures/add-ons";
import { baseProcedure } from "@/procedures/base-procedure";
import { registerSchema } from "@/validation-schemas/auth-schemas";

export const POST = baseProcedure
  .interceptRequest(validateBody(registerSchema))
  .interceptResponse(translateError("AuthServiceErrors"))
  .createHandler(async (_, ctx) => {
    return await ctx.service.auth.register(ctx.body);
  });
