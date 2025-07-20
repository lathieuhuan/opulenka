import { baseProcedure } from "@/procedures/base-procedure";
import { COMMON_ERRORS, ErrorResponse, SuccessResponse } from "@opulenka/service";
import { endUserSession } from "@/utils/auth-utils";

export const POST = baseProcedure.createHandler(async () => {
  try {
    await endUserSession();
    return new SuccessResponse(200);
  } catch (error) {
    return new ErrorResponse(500, COMMON_ERRORS.SYSTEM_ERROR);
  }
});
