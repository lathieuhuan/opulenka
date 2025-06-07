export const IS_DEV_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";

const protocol = IS_DEV_ENV ? "http" : "https";
const domain = process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000";
export const DOMAIN = `${protocol}://${domain}`;
