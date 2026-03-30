import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { pool } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

type UserRow = RowDataPacket & {
  nom_complet: string;
  email: string;
  url_avatar: string;
};

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token || !process.env.JWT_SECRET) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const id_user = Number(payload.sub);

    if (!Number.isFinite(id_user)) {
      return NextResponse.json({ message: "Token invalide" }, { status: 401 });
    }

    const [rows] = await pool.query<UserRow[]>(
      "SELECT nom_complet, email, url_avatar FROM user WHERE id_user = ? LIMIT 1",
      [id_user],
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Utilisateur introuvable" },
        { status: 404 },
      );
    }

    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.error("USER_GET_ERROR", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
