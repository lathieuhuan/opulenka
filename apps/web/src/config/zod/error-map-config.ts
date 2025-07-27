import { z, ZodIssueCode, ZodParsedType } from "zod";
import { ErrorEncoder } from "./error-processing";
import { ZOD_ERROR_MESSAGES } from "./error-messages";

const errorMap: z.ZodErrorMap = (issue, ctx) => {
  let message = ctx.defaultError;

  // console.log("=== issue");
  // console.log(issue);
  // console.log("message", message);

  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined || issue.received === ZodParsedType.null) {
        message = ZOD_ERROR_MESSAGES.REQUIRED_INFO;
      } else {
        message = ZOD_ERROR_MESSAGES.INVALID_VALUE;
      }
      break;
    case ZodIssueCode.invalid_enum_value:
    case ZodIssueCode.invalid_literal:
      message = ZOD_ERROR_MESSAGES.INVALID_VALUE;
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "string") {
        if (issue.minimum === 1) {
          message = ZOD_ERROR_MESSAGES.REQUIRED_INFO;
        } else {
          message = ErrorEncoder.minLength(issue.minimum);
        }
      }
      break;
  }
  return { message };
};

z.setErrorMap(errorMap);

// console.log("==> This file should run once per client");
