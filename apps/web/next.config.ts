import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  transpilePackages: ["@opulenka/service"],
};

const withNextIntl = createNextIntlPlugin("./src/config/i18n.ts");

export default withNextIntl(nextConfig);
