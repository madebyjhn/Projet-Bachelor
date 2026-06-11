import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { getDb } from "@/lib/mongodb";
import type { ActivityLog } from "@/lib/activityLog";

async function authenticate() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token || !process.env.JWT_SECRET) return null;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  return Number(payload.sub);
}

export async function GET(req: Request) {
  try {
    const id_user = await authenticate();
    if (!id_user)
      return NextResponse.json({ message: "Session invalide" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const limit = Math.min(Number(searchParams.get("limit") ?? "50"), 200);

    const db = await getDb();
    const logs = await db
      .collection<ActivityLog>("activity_logs")
      .find({ id_user })
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();

    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    console.error("LOGS_GET_ERROR", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
