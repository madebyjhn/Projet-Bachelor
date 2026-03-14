import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { pool } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token || !process.env.JWT_SECRET) {
      return NextResponse.json(
        { message: "Session invalide" },
        { status: 401 },
      );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwtVerify(token, secret);
    const id_user = Number(payload.sub);

    const { description, type, date, montant, id_project, category_name } =
      await req.json();

    let id_category = 0;

    if (!type || !date || montant === 0 || !id_project) {
      return NextResponse.json(
        { message: "Champs manquants" },
        { status: 400 },
      );
    }

    const [rows] = await pool.query(
      "SELECT id_project FROM project WHERE id_user = ? AND id_project = ? LIMIT 1",
      [id_user, id_project],
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Projet inexistant" },
        { status: 404 },
      );
    }

    const [category] = await pool.query(
      "SELECT id_category FROM category WHERE nom = ? AND id_user = ?",
      [category_name, id_user],
    );

    if (category.length === 0) {
      const [inst] = await pool.query(
        "INSERT INTO category (nom, id_user) VALUES (?, ?)",
        [category_name, id_user],
      );

      id_category = inst.insertId;
    } else {
      id_category = category[0].id_category;
    }

    const [data] = await pool.query(
      "INSERT INTO `transaction` (description, type, date, montant, id_project, id_category, id_user) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [description, type, date, montant, id_project, id_category, id_user],
    );

    const [revenusRows] = await pool.query(
      "SELECT COALESCE(SUM(montant), 0) AS total FROM `transaction` WHERE id_project = ? AND type = 'income';",
      [id_project],
    );

    const [depensesRows] = await pool.query(
      "SELECT COALESCE(SUM(montant), 0) AS total FROM `transaction` WHERE id_project = ? AND type = 'expense';",
      [id_project],
    );

    const total_revenus = revenusRows[0].total;
    const total_depenses = depensesRows[0].total;
    const benefice = total_revenus - total_depenses;

    let rentabilite = 0;

    if (total_revenus > 0) {
      rentabilite = Number((benefice / total_revenus).toFixed(4));
    }

    await pool.query(
      "UPDATE project SET total_revenus = ?, total_depenses = ?, benefice = ?, rentabilite = ? WHERE id_project = ?;",
      [total_revenus, total_depenses, benefice, rentabilite, id_project],
    );

    return NextResponse.json(
      { message: "Transaction effectuée avec succès !" },
      { status: 200 },
    );
  } catch (error) {
    console.error("TRANSACTION_POST_ERROR", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
