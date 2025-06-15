import { z } from "zod";
import { StringUtils } from "@/lib/utils/string-utils";

export const registerSchema = z
  .object({
    email: z
      .string()
      .nonempty()
      .refine((value) => !StringUtils.isEmpty(value), "INVALID_VALUE"),
    password: z
      .string()
      .min(6)
      .refine((value) => !StringUtils.isEmpty(value), "INVALID_VALUE"),
    passwordConfirm: z.string().nonempty(),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "INCORRECT_PASSWORD_CONFIRM",
        path: ["passwordConfirm"],
      });
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
