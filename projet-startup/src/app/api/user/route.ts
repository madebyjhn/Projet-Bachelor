import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { pool } from "@/lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

type UserRow = RowDataPacket & {
  nom_complet: string;
  email: string;
  url_avatar: string;
};

async function authenticate() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token || !process.env.JWT_SECRET) return null;

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  return Number(payload.sub);
}

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

export async function PUT(req: Request) {
  try {
    const id_user = await authenticate();
    if (!id_user) {
      return NextResponse.json(
        { message: "Session invalide" },
        { status: 401 },
      );
    }
    const { nom_complet, email } = await req.json();

    const [rows] = await pool.query<ResultSetHeader>(
      "UPDATE user SET nom_complet = ?, email = ? WHERE id_user = ?",
      [nom_complet, email, id_user],
    );

    if (rows.affectedRows === 0) {
      return NextResponse.json(
        { message: "Aucun utilisateur trouvé" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Profil mis à jour" }, { status: 200 });
  } catch (error) {
    console.error("USER_PUT_ERROR", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
export async function DELETE() {
  try {
    const id_user = await authenticate();
    if (!id_user) {
      return NextResponse.json(
        { message: "Session invalide" },
        { status: 401 },
      );
    }

    await pool.query("DELETE FROM `transaction` WHERE id_user = ?", [id_user]);
    await pool.query("DELETE FROM project WHERE id_user = ?", [id_user]);
    await pool.query("DELETE FROM category WHERE id_user = ?", [id_user]);

    const [rows] = await pool.query<ResultSetHeader>(
      "DELETE FROM user WHERE id_user = ?",
      [id_user],
    );

    if (rows.affectedRows === 0) {
      return NextResponse.json(
        { message: "Aucun utilisateur trouvé" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Compte supprimé" }, { status: 200 });
  } catch (error) {
    console.error("USER_DELETE_ERROR", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
