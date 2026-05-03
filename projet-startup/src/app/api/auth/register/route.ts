import { pool } from "../../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Champs manquants" },
        { status: 400 },
      );
    }

    const [rows] = await pool.query(
      "SELECT id_user FROM user WHERE email = ?",
      [email],
    );
    if ((rows as unknown[]).length > 0) {
      return NextResponse.json({ message: "email existant" }, { status: 400 });
    }

    const saltedRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltedRounds);

    const verifToken = crypto.randomBytes(32).toString("hex");

    await pool.query(
      "INSERT INTO user (nom_complet, email, password, verification_token, verification_expires) VALUES ( ?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))",
      [name, email, hashedPassword, verifToken],
    );

    const baseUrl = new URL(req.url).origin;
    const link = `${baseUrl}/api/auth/verify?token=${verifToken}`;

    return NextResponse.json(
      { message: "Compte créé", verifyLink: link },
      { status: 201 },
    );
  } catch (err) {
    return NextResponse.json({ message: { err } }, { status: 500 });
  }
}
