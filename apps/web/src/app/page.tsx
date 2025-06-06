import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <div>
      <h1>{t("TITLE")}</h1>
    </div>
  );
}
