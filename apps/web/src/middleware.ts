import { getLocale } from "next-intl/server";
import { NextRequest, NextResponse } from "next/server";

import { getUserSession } from "./utils/auth-utils";

const AUTH_PATHS = ["/register", "/login"];

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = await getUserSession();
  const url = request.nextUrl.clone();

  if (!session) {
    // Not logged in
    if (pathname === "/") {
      const locale = await getLocale();
      url.pathname = `/${locale}`;
      return NextResponse.redirect(url);
    }
  } else {
    // Logged in
    if (AUTH_PATHS.includes(pathname)) {
      url.pathname = `/app`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
