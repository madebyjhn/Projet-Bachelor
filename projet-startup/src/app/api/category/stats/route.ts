import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { pool } from "../../../../lib/db";
import { NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token || !process.env.JWT_SECRET) {
      return NextResponse.json({ message: "Non authentifié" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const id_user = Number(payload.sub);

    const { searchParams } = new URL(req.url);
    const id_project = Number(searchParams.get("id_project"));

    if (!id_project) {
      return NextResponse.json(
        { message: "id_project manquant" },
        { status: 400 },
      );
    }

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT c.nom, COUNT(t.id_transaction) as count, SUM(t.montant) as total
      FROM \`transaction\` t
      JOIN category c ON t.id_category = c.id_category
      WHERE t.id_project = ? AND t.id_user = ?
      GROUP BY c.id_category, c.nom
      `,
      [id_project, id_user],
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("CATEGORY_STATS_GET_ERROR", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
