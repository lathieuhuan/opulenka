import { NeonDbError } from "@neondatabase/serverless";
import { ErrorResponse } from "@/interfaces/services";
import { COMMON_ERRORS } from "@/services/errors";

export function CatchErrors(originalMethod: any) {
  //
  async function api(this: any, ...args: any[]) {
    try {
      const result = await originalMethod.call(this, ...args);
      return result;
    } catch (error) {
      //
      if (error instanceof ErrorResponse) {
        return error;
      }

      // General errors like database errors are mapped here

      if (error instanceof NeonDbError) {
        console.log("NEON_ERROR");
        console.error(error);
      } //
      else if (error instanceof Error) {
        console.log("ERROR");
        console.error(error);
      }

      return new ErrorResponse(500, COMMON_ERRORS.SYSTEM_ERROR);
    }
  }

  return api;
}
