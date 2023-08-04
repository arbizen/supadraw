import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const session = await supabase.auth.getSession();
  const isAuth = session.data.session;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");
  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/pad", req.url));
    }

    return null;
  }

  if (!isAuth) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }
    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
    );
  }
}

export const config = {
  matcher: ["/login", "/pad"],
};
