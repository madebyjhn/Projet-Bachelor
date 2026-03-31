import { cookies } from "next/headers";
import { pool } from "../../../lib/db";
import { NextResponse } from "next/server";

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

    const [rows] = await pool.query(
      "SELECT id_category, nom FROM category WERE id_user = ?;",
      [id_user],
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Categorie introuvable" },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("CATEGORY_GET_ERROR", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
