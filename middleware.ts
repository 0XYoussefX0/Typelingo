import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createClient } from "./lib/supabase/server";

import { websiteDomain } from "./lib/utils";

// make an array of all the protected routes

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);

  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/dashboard") && !data?.user) {
    return NextResponse.redirect(`${websiteDomain}/login`);
  } else if (
    (pathname.startsWith("/getting-started") ||
      pathname === "/" ||
      pathname === "/signUp" ||
      pathname === "/login") &&
    data?.user
  ) {
    return NextResponse.redirect(`${websiteDomain}/dashboard`);
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
