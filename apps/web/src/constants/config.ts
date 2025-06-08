const ENV = process.env.NEXT_PUBLIC_VERCEL_ENV; // "development", "preview", "production"
export const IS_DEV_ENV = ENV === "development";

const protocol = IS_DEV_ENV ? "http" : "https";
const domain =
  ENV === "production"
    ? process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
    : process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000";
// NEXT_PUBLIC_VERCEL_URL is the generated deployment URL which contains the deployment ID.
// Docs: https://vercel.com/docs/environment-variables/framework-environment-variables
export const DOMAIN = `${protocol}://${domain}`;
