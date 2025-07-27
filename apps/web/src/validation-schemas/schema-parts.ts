import { z } from "zod";
import { StringUtils } from "@/lib/utils/string-utils";
import { ZOD_ERROR_MESSAGES } from "@/config/zod";

export const requiredString = z
  .string()
  .nonempty()
  .refine((value) => !StringUtils.isEmpty(value), ZOD_ERROR_MESSAGES.INVALID_VALUE);

export const optionalString = z
  .string()
  .optional()
  .refine(
    (value) => value === undefined || !StringUtils.isEmpty(value),
    ZOD_ERROR_MESSAGES.INVALID_VALUE,
  );

// if value is invalid per refine, it will not go to transform

export const optionalNumber = z
  .any()
  .refine((value) => value === "" || typeof value === "number", ZOD_ERROR_MESSAGES.INVALID_VALUE)
  .transform((value) => (value === undefined || value === "" ? undefined : Number(value)));

export const requiredNumber = z
  .any()
  .optional()
  .refine((value) => value === "" || typeof value === "number", ZOD_ERROR_MESSAGES.INVALID_VALUE)
  .refine((value) => value !== undefined && value !== "", ZOD_ERROR_MESSAGES.REQUIRED_INFO)
  .transform((value) => Number(value));
