import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { pool } from "../../../lib/db";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

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
      "SELECT id_project, name, description, total_revenus, total_depenses, benefice FROM project WHERE id_user = ?",
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

    return NextResponse.json(
      { message: "Projet créé !", id_project: result.insertId },
      { status: 201 },
    );
  } catch (error) {
    console.error("PROJECTS_POST_ERROR", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
