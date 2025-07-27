import { z } from "zod";
import { requiredString } from "./schema-parts";

export const registerSchema = z
  .object({
    email: requiredString,
    password: requiredString,
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

export const loginSchema = z.object({
  email: requiredString,
  password: requiredString,
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
