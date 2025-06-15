import { getRequestConfig } from "next-intl/server";

export const LOCALES = ["en"] as const;

export type Locale = (typeof LOCALES)[number];

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
