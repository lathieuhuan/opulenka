import { z } from "zod";
import { StringUtils } from "@/lib/utils/string-utils";
import { ZOD_ERROR_MESSAGES } from "@/config/zod";

function isEmptyString(value: string | undefined) {
  return value === undefined || value === "";
}

export const requiredString = z
  .string()
  .nonempty()
  .refine((value) => !StringUtils.isEmpty(value), ZOD_ERROR_MESSAGES.INVALID_VALUE);

export const optionalString = z
  .string()
  .optional()
  .refine(
    (value) => isEmptyString(value) || !StringUtils.isEmpty(value),
    ZOD_ERROR_MESSAGES.INVALID_VALUE,
  )
  .transform((value) => (isEmptyString(value) ? undefined : value));

// if value is invalid per refine, it will not go to transform

export const optionalNumber = z
  .any()
  .refine((value) => value === "" || typeof value === "number", ZOD_ERROR_MESSAGES.INVALID_VALUE)
  .transform((value) => (isEmptyString(value) ? undefined : Number(value)));

export const requiredNumber = z
  .any()
  .optional()
  .refine((value) => value === "" || typeof value === "number", ZOD_ERROR_MESSAGES.INVALID_VALUE)
  .refine((value) => !isEmptyString(value), ZOD_ERROR_MESSAGES.REQUIRED_INFO)
  .transform((value) => Number(value));
