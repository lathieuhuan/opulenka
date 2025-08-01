"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { DEFAULT_PLACEHOLDER } from "@/components/form/configs";
import { login } from "@/services/auth-service";
import { loginSchema, type LoginSchema } from "@/validation-schemas/auth-schemas";

// Components
import { Form, FormField, FormInput } from "@/components/form";
import { PasswordInput } from "@/components/password-input";
import { TextLink } from "@/components/text-link";
import { Button } from "@/lib/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/components/card";
import { Message } from "@/lib/components/message";

export function LoginForm() {
  const t = useTranslations("LoginForm");
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const {
    isPending,
    error,
    mutate: tryLogin,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => router.push("/app"),
  });

  const handleSubmit = async (data: LoginSchema) => {
    tryLogin(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-center">{t("title")}</CardTitle>
      </CardHeader>

      <CardContent>
        <Form form={form} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-2">
            <FormInput name="email" label={t("email")} />

            <div>
              <FormField name="password" label={t("password")}>
                <PasswordInput placeholder={DEFAULT_PLACEHOLDER.__Enter} />
              </FormField>

              <div className="text-right text-sm">
                <TextLink href="#" className="font-normal">
                  {t("forgotPassword")}
                </TextLink>
              </div>
            </div>

            {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="bg-background text-muted-foreground relative z-10 px-2">
                Or continue with
              </span>
            </div> */}
            {/* <Button variant="outline" className="w-full">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  fill="currentColor"
                />
              </svg>
              Login with GitHub
            </Button> */}
          </div>

          <div className="space-y-4">
            {error && <Message preset="error" message={error.message} />}

            <Button type="submit" className="w-full" color="primary" disabled={isPending}>
              <span>{t("login")}</span>
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            </Button>
          </div>

          <div className="text-center text-sm">
            {t.rich("newUserMessage", {
              link: (chunks) => <TextLink href="/register">{chunks}</TextLink>,
            })}
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
