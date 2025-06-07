import { baseProcedure } from "@/procedures/base-procedure";

export const POST = baseProcedure
  .interceptRequest(async (request, ctx) => {
    const body: {
      email: string;
      password: string;
    } = await request.json();

    return {
      ...ctx,
      body,
    };
  })
  .createHandler((_, ctx) => {
    return ctx.authService.register(ctx.body);
  });
