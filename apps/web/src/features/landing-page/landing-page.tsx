import { useTranslations } from "next-intl";
import Link from "next/link";

import { Button } from "@/lib/components/button";

export function LandingPage() {
  const t = useTranslations("LandingPage");

  return (
    <div className="flex justify-center">
      <section className="py-32">
        <div className="container">
          <div className="flex flex-col items-center rounded-lg bg-accent p-8 text-center md:rounded-xl lg:p-16">
            <h3 className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
              {t("title")}
            </h3>
            <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">{t("description")}</p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row">
              <Button variant="secondary" className="w-full sm:w-auto" asChild>
                <Link href="/login">{t("ctaSecondary")}</Link>
              </Button>
              <Button className="w-full sm:w-auto" asChild>
                <Link href="/register">{t("ctaPrimary")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
