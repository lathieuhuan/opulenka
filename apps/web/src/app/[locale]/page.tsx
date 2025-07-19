import { notFound } from "next/navigation";
import { LOCALES, Locale } from "@/config/i18n";
import { LandingPage } from "@/features/landing-page";

export default async function ({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!LOCALES.includes(locale as Locale)) {
    notFound();
  }

  return <LandingPage />;
}
