import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { pool } from "../../../lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import { logActivity } from "../../../lib/activityLog";

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
    if (!id_user) {
      return NextResponse.json(
        { message: "Session invalide" },
        { status: 401 },
      );
    }

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT p.id_project, p.name, p.description, p.total_revenus, p.total_depenses, p.benefice,
              COUNT(t.id_transaction) AS transaction_count
       FROM project p
       LEFT JOIN \`transaction\` t ON t.id_project = p.id_project
       WHERE p.id_user = ?
       GROUP BY p.id_project`,
      [id_user],
    );

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("PROJECTS_GET_ERROR", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const id_user = await authenticate();
    if (!id_user) {
      return NextResponse.json(
        { message: "Session invalide" },
        { status: 401 },
      );
    }

    const { nom_projet, description } = await req.json();

    if (!nom_projet || !description) {
      return NextResponse.json(
        { message: "Champs manquants" },
        { status: 400 },
      );
    }

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO project (id_user, name, description) VALUES (?, ?, ?)",
      [id_user, nom_projet, description],
    );

    logActivity(id_user, "PROJECT_CREATED", "project", {
      id_project: result.insertId,
      name: nom_projet,
    });

    return NextResponse.json(
      { message: "Projet créé !", id_project: result.insertId },
      { status: 201 },
    );
  } catch (error) {
    console.error("PROJECTS_POST_ERROR", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const id_user = await authenticate();
    if (!id_user)
      return NextResponse.json({ message: "Session invalide" }, { status: 401 });

    const { id_project, nom_projet, description } = await req.json();

    if (!id_project || !nom_projet || !description)
      return NextResponse.json({ message: "Champs manquants" }, { status: 400 });

    await pool.query(
      "UPDATE project SET name = ?, description = ? WHERE id_project = ? AND id_user = ?",
      [nom_projet, description, id_project, id_user],
    );

    logActivity(id_user, "PROJECT_UPDATED", "project", {
      id_project,
      name: nom_projet,
    });

    return NextResponse.json({ message: "Projet modifié !" }, { status: 200 });
  } catch (error) {
    console.error("PROJECTS_PATCH_ERROR", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const id_user = await authenticate();
    if (!id_user)
      return NextResponse.json({ message: "Session invalide" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id_project = Number(searchParams.get("id_project"));

    if (!id_project)
      return NextResponse.json({ message: "Paramètre manquant" }, { status: 400 });

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id_project FROM project WHERE id_project = ? AND id_user = ? LIMIT 1",
      [id_project, id_user],
    );
    if (rows.length === 0)
      return NextResponse.json({ message: "Projet introuvable" }, { status: 404 });

    await pool.query("DELETE FROM `transaction` WHERE id_project = ?", [id_project]);
    await pool.query("DELETE FROM project WHERE id_project = ? AND id_user = ?", [id_project, id_user]);

    logActivity(id_user, "PROJECT_DELETED", "project", { id_project });

    return NextResponse.json({ message: "Projet supprimé !" }, { status: 200 });
  } catch (error) {
    console.error("PROJECTS_DELETE_ERROR", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
