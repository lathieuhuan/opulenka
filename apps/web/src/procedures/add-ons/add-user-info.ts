import { COMMON_ERRORS, ErrorResponse } from "@opulenka/service";

import { UserInfo } from "@/types/global";
import { getUserSession } from "@/utils/auth-utils";
import { RequestInterceptor } from "../procedure";

export function addUserInfo<TPreContext = void>(): RequestInterceptor<
  TPreContext & { user: UserInfo },
  TPreContext
> {
  //
  return async (_, ctx) => {
    const user = await getUserSession();

    if (user) {
      return {
        ...ctx,
        user,
      };
    }
    return new ErrorResponse(401, COMMON_ERRORS.UNAUTHORIZED);
  };
}
