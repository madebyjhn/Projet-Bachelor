export async function GET(req: Request) {
  import { pool } from "../../../../lib/db";
  import { NextResponse } from "next/server";
  const { searchParams } = new URL(req.url);
  const id_project = Number(searchParams.get("id_project"));

  const [rows] = await pool.query(
    `SELECT c.nom, COUNT(t.id_transaction) as count
     FROM \`transaction\` t
     JOIN category c ON t.id_category = c.id_category
     WHERE t.id_project = ? AND t.id_user = ?
     GROUP BY c.id_category, c.nom;`,
    [id_project, id_user],
  );
  return NextResponse.json(rows);
}
