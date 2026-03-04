import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { pool } from "@/lib/db";
import type { RowDataPacket } from "mysql2";

type ProjectRow = RowDataPacket & {
  id_project: number;
  id_user: number;
  name: string;
  description: string | null;
  total_revenus: number;
  total_depenses: number;
  benefice: number;
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

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);

  const id_user = Number(payload.sub);

  const projectId = Number.parseInt(projectIdRaw, 10);

  if (!Number.isFinite(projectId)) {
    redirect("/dashboard");
  }

  const [rows] = await pool.query<ProjectRow[]>(
    "SELECT id_project, id_user, name, description, total_revenus, total_depenses, benefice FROM project WHERE id_project = ? AND id_user = ?",
    [projectId, id_user],
  );

  if (rows.length === 0) {
    redirect("/dashboard");
  }
  const project = rows[0];

  return (
    <div>
      <p>Bienvenue sur votre projet {project.name}</p>
      <p>Revenus totaux : {project.total_revenus}</p>
      <p>Revenus depenses : {project.total_depenses}</p>
      <p> Bénéfice : {project.benefice}</p>
    </div>
  );
}
