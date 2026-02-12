import { NextResponse } from "next/server";
import { pool } from "../../../../lib/db";
import { jwtVerify } from "jose";
import Dashboard from "../../../dashboard/page";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return NextResponse.json({ message: "Token manquant" }, { status: 400 });
    }

    const [rows] = await pool.query<{ id_user: number }[]>(
      "SELECT id_user FROM `user` WHERE verification_token = ? AND verification_expires > NOW() LIMIT 1;",
      [token],
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Lien invalide ou expiré" },
        { status: 400 },
      );
    }

    await pool.query(
      "UPDATE `user` SET active = 1, verification_token = NULL, verification_expires = NULL WHERE id_user = ?",
      [rows[0].id_user],
    );

    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (err) {
    console.error("VERIFY ERROR", err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
