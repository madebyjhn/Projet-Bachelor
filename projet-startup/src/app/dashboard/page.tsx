import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { pool } from "@/lib/db";
import DashboardClient from "./DashboardClient";

import type { RowDataPacket } from "mysql2";

type UserRow = RowDataPacket & {
  nom_complet: string;
};

type ProjectRow = RowDataPacket & {
  id_project: number;
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/auth");
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);

  const id_user = Number(payload.sub);

  const [users] = await pool.query<UserRow[]>(
    "SELECT nom_complet FROM user WHERE id_user = ?",
    [id_user],
  );

  const userName = users[0].nom_complet;

  const [projects] = await pool.query<ProjectRow[]>(
    "SELECT id_project FROM project WHERE id_user = ?",
    [id_user],
  );

  if (projects.length > 0) {
    const projectId = projects[0].id_project;
    redirect(`/dashboard/${projectId}`);
  }

  return <DashboardClient hasProjects={false} userName={userName} />;
}
