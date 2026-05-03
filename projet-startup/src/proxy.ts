import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value;

  let isAuthed = false;

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      isAuthed = true;
    } catch {
      isAuthed = false;
    }
  }

  if (pathname.startsWith("/dashboard") && !isAuthed) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  if (pathname.startsWith("/auth") && isAuthed) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
