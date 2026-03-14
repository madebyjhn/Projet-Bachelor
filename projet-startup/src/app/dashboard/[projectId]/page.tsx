import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { pool } from "@/lib/db";
import type { RowDataPacket } from "mysql2";
import Dashboard from "./DashboardProject";

type ProjectRow = RowDataPacket & {
  id_project: number;
  id_user: number;
  name: string;
  description: string | null;
  total_revenus: number;
  total_depenses: number;
  benefice: number;
  rentabilite: number;
};

type UserRow = RowDataPacket & {
  id_user: number;
  nom_complet: string;
  email: string;
  url_avatar: string;
};

export default async function DashboardProject({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId: projectIdRaw } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/auth");
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET manquant");
  }

  const secret = new TextEncoder().encode(jwtSecret);
  const { payload } = await jwtVerify(token, secret);

  const id_user = Number(payload.sub);
  const projectId = Number.parseInt(projectIdRaw, 10);

  if (!Number.isFinite(id_user) || !Number.isFinite(projectId)) {
    redirect("/dashboard");
  }

  const [projectRows] = await pool.query<ProjectRow[]>(
    "SELECT id_project, id_user, name, description, total_revenus, total_depenses, benefice, rentabilite FROM project WHERE id_project = ? AND id_user = ? LIMIT 1",
    [projectId, id_user],
  );

  if (projectRows.length === 0) {
    redirect("/dashboard");
  }

  const [userRows] = await pool.query<UserRow[]>(
    "SELECT id_user, nom_complet, email, url_avatar FROM user WHERE id_user = ? LIMIT 1",
    [id_user],
  );

  if (userRows.length === 0) {
    redirect("/auth");
  }

  const project = projectRows[0];
  const user = userRows[0];

  return <Dashboard project={project} projectId={projectId} user={user} />;
}
