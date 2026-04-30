import { pool } from "../../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { RowDataPacket } from "mysql2";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Champs manquants" },
        { status: 400 },
      );
    }

    const [rows] = await pool.query<
      (RowDataPacket & { id_user: number; password: string; active: number })[]
    >("SELECT id_user, password, active FROM `user` WHERE email = ? LIMIT 1", [
      email,
    ]);

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Identifiants invalides" },
        { status: 401 },
      );
    }

    const user = rows[0];

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      return NextResponse.json(
        { message: "Identifiants invalides" },
        { status: 401 },
      );
    } else if (user.active === 0) {
      return NextResponse.json({ message: "Compte inactif" }, { status: 403 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const res = NextResponse.json({ message: "Connexion OK" }, { status: 200 });

    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(String(user.id_user))
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (err) {
    console.error("LOGIN_ERROR", err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
