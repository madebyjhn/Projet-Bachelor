import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { pool } from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Pas de session" }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const id_user = Number(payload.sub);

    const { nom_projet, description } = await req.json();

    if (!nom_projet || !description) {
      return NextResponse.json(
        { message: "Champs manquants" },
        { status: 400 },
      );
    }

    const [rows] = await pool.query(
      "INSERT INTO project (id_user, name, description) VALUES (?, ?, ?)",
      [id_user, nom_projet, description],
    );

    return NextResponse.json({ message: "Projet créé !" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
