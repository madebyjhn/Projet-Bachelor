import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { logActivity } from "../../../../lib/activityLog";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (token && process.env.JWT_SECRET) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      logActivity(Number(payload.sub), "LOGOUT", "auth");
    } catch {
      // token invalide ou expiré, on ignore
    }
  }

  const res = NextResponse.json({ message: "Déconnecté" }, { status: 200 });

  res.cookies.set("token", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return res;
}
