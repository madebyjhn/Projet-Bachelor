import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { pool } from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

async function authenticate() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token || !process.env.JWT_SECRET) return null;

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);
  return Number(payload.sub);
}
export async function POST(req: Request) {
  try {
    const id_user = await authenticate();
    if (!id_user)
      return NextResponse.json(
        { message: "Session invalide" },
        { status: 401 },
      );

    const { description, type, date, montant, id_project, category_name } =
      await req.json();

    if (!type || !date || !montant || !id_project)
      return NextResponse.json(
        { message: "Champs manquants" },
        { status: 400 },
      );

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id_project FROM project WHERE id_user = ? AND id_project = ? LIMIT 1",
      [id_user, id_project],
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Projet inexistant" },
        { status: 404 },
      );
    }

    let id_category = 0;
    const [category] = await pool.query<(RowDataPacket & { id_category: number })[]>(
      "SELECT id_category FROM category WHERE nom = ? AND id_user = ?",
      [category_name, id_user],
    );

    if (category.length === 0) {
      const [inst] = await pool.query<ResultSetHeader>(
        "INSERT INTO category (nom, id_user) VALUES (?, ?)",
        [category_name, id_user],
      );
      id_category = inst.insertId;
    } else {
      id_category = category[0].id_category;
    }

    await pool.query(
      "INSERT INTO `transaction` (description, type, date, montant, id_project, id_category, id_user) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [description, type, date, montant, id_project, id_category, id_user],
    );

    const [revenusRows] = await pool.query<(RowDataPacket & { total: number })[]>(
      "SELECT COALESCE(SUM(montant), 0) AS total FROM `transaction` WHERE id_project = ? AND type = 'income'",
      [id_project],
    );
    const [depensesRows] = await pool.query<(RowDataPacket & { total: number })[]>(
      "SELECT COALESCE(SUM(montant), 0) AS total FROM `transaction` WHERE id_project = ? AND type = 'expense'",
      [id_project],
    );

    const total_revenus = Number(revenusRows[0].total);
    const total_depenses = Number(depensesRows[0].total);
    const benefice = total_revenus - total_depenses;
    const rentabilite =
      total_revenus > 0 ? Number((benefice / total_revenus).toFixed(4)) : 0;

    await pool.query(
      "UPDATE project SET total_revenus = ?, total_depenses = ?, benefice = ?, rentabilite = ? WHERE id_project = ?",
      [total_revenus, total_depenses, benefice, rentabilite, id_project],
    );

    const normalizedDate = String(date).split("T")[0];

    return NextResponse.json(
      {
        message: "Transaction effectuée avec succès !",
        stats: { total_revenus, total_depenses, benefice, rentabilite },
        transaction: {
          date: normalizedDate,
          type,
          montant: Number(montant),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("TRANSACTION_POST_ERROR", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
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

    const { searchParams } = new URL(req.url);
    const id_project = Number(searchParams.get("id_project"));

    if (!id_project)
      return NextResponse.json({ message: "Projet manquant" }, { status: 400 });

    const [rows] = await pool.query(
      `SELECT t.id_transaction, t.description, t.type, t.date, t.montant, c.nom AS category_name
       FROM \`transaction\` t
       LEFT JOIN \`category\` c ON t.id_category = c.id_category
       WHERE t.id_user = ? AND t.id_project = ?
       ORDER BY t.date DESC`,
      [id_user, id_project],
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("TRANSACTION_GET_ERROR", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const id_user = await authenticate();
    if (!id_user) {
      return NextResponse.json(
        { message: "Session invalide" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const id_transaction = Number(searchParams.get("id_transaction"));

    if (!id_transaction)
      return NextResponse.json(
        { message: "Paramètres manquants" },
        { status: 400 },
      );

    const [txRows] = await pool.query(
      "SELECT id_project FROM `transaction` WHERE id_transaction = ? AND id_user = ? LIMIT 1",
      [id_transaction, id_user],
    );

    if ((txRows as []).length === 0)
      return NextResponse.json(
        { message: "Transaction introuvable" },
        { status: 404 },
      );

    const id_project = (txRows as { id_project: number }[])[0].id_project;

    await pool.query(
      "DELETE FROM `transaction` WHERE id_user = ? AND id_transaction = ?",
      [id_user, id_transaction],
    );

    const [revenusRows] = await pool.query(
      "SELECT COALESCE(SUM(montant), 0) AS total FROM `transaction` WHERE id_project = ? AND type = 'income'",
      [id_project],
    );
    const [depensesRows] = await pool.query(
      "SELECT COALESCE(SUM(montant), 0) AS total FROM `transaction` WHERE id_project = ? AND type = 'expense'",
      [id_project],
    );

    const total_revenus = Number((revenusRows as { total: number }[])[0].total);
    const total_depenses = Number(
      (depensesRows as { total: number }[])[0].total,
    );
    const benefice = total_revenus - total_depenses;
    const rentabilite =
      total_revenus > 0 ? Number((benefice / total_revenus).toFixed(4)) : 0;

    await pool.query(
      "UPDATE project SET total_revenus = ?, total_depenses = ?, benefice = ?, rentabilite = ? WHERE id_project = ?",
      [total_revenus, total_depenses, benefice, rentabilite, id_project],
    );

    return NextResponse.json(
      { message: "Transaction supprimée" },
      { status: 200 },
    );
  } catch (error) {
    console.error("TRANSACTION_DELETE_ERROR", error);
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

    const { searchParams } = new URL(req.url);
    const id_transaction = Number(searchParams.get("id_transaction"));

    if (!id_transaction)
      return NextResponse.json(
        { message: "Paramètres manquants" },
        { status: 400 },
      );

    const [txRows] = await pool.query(
      "SELECT id_project FROM `transaction` WHERE id_transaction = ? AND id_user = ? LIMIT 1",
      [id_transaction, id_user],
    );

    if ((txRows as []).length === 0)
      return NextResponse.json(
        { message: "Transaction introuvable" },
        { status: 404 },
      );

    const id_project = (txRows as { id_project: number }[])[0].id_project;

    const { description, type, date, montant, category_name } = await req.json();

    let id_category = 0;
    const [category] = await pool.query(
      "SELECT id_category FROM category WHERE nom = ? AND id_user = ?",
      [category_name, id_user],
    );

    if ((category as []).length === 0) {
      const [inst] = await pool.query(
        "INSERT INTO category (nom, id_user) VALUES (?, ?)",
        [category_name, id_user],
      );
      id_category = (inst as { insertId: number }).insertId;
    } else {
      id_category = (category as { id_category: number }[])[0].id_category;
    }

    await pool.query(
      "UPDATE `transaction` SET description = ?, type = ?, date = ?, montant = ?, id_category = ? WHERE id_transaction = ? AND id_user = ?",
      [description, type, date, montant, id_category, id_transaction, id_user],
    );

    const [revenusRows] = await pool.query(
      "SELECT COALESCE(SUM(montant), 0) AS total FROM `transaction` WHERE id_project = ? AND type = 'income'",
      [id_project],
    );
    const [depensesRows] = await pool.query(
      "SELECT COALESCE(SUM(montant), 0) AS total FROM `transaction` WHERE id_project = ? AND type = 'expense'",
      [id_project],
    );

    const total_revenus = Number((revenusRows as { total: number }[])[0].total);
    const total_depenses = Number(
      (depensesRows as { total: number }[])[0].total,
    );
    const benefice = total_revenus - total_depenses;
    const rentabilite =
      total_revenus > 0 ? Number((benefice / total_revenus).toFixed(4)) : 0;

    await pool.query(
      "UPDATE project SET total_revenus = ?, total_depenses = ?, benefice = ?, rentabilite = ? WHERE id_project = ?",
      [total_revenus, total_depenses, benefice, rentabilite, id_project],
    );

    const normalizedDate = String(date).split("T")[0];

    return NextResponse.json(
      {
        message: "Transaction modifiée avec succès !",
        stats: { total_revenus, total_depenses, benefice, rentabilite },
        transaction: {
          id_transaction,
          description,
          type,
          date: normalizedDate,
          montant: Number(montant),
          category_name,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("TRANSACTION_PUT_ERROR", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
