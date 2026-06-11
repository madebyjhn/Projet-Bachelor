"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TopBar from "../../../../components/layout/TopBar";
import SideBar from "../../../../components/layout/SideBar";
import { NeumorphicCard } from "../../../../components/ui/NeumorphicCard";
import {
  LogIn,
  LogOut,
  TrendingUp,
  TrendingDown,
  PenLine,
  FolderPlus,
  FolderX,
  FolderEdit,
  ShieldAlert,
} from "lucide-react";

type User = {
  nom_complet: string;
  email: string;
  url_avatar: string;
};

type Log = {
  _id: string;
  action: string;
  entity: string;
  details: Record<string, unknown>;
  timestamp: string;
};

const ACTION_META: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  LOGIN_SUCCESS:        { label: "Connexion réussie",        color: "text-green-500",  icon: <LogIn className="w-4 h-4" /> },
  LOGIN_FAILED:         { label: "Tentative de connexion",   color: "text-red-500",    icon: <ShieldAlert className="w-4 h-4" /> },
  LOGOUT:               { label: "Déconnexion",              color: "text-slate-400",  icon: <LogOut className="w-4 h-4" /> },
  TRANSACTION_CREATED:  { label: "Transaction ajoutée",      color: "text-violet-400", icon: <TrendingUp className="w-4 h-4" /> },
  TRANSACTION_DELETED:  { label: "Transaction supprimée",    color: "text-red-400",    icon: <TrendingDown className="w-4 h-4" /> },
  TRANSACTION_UPDATED:  { label: "Transaction modifiée",     color: "text-blue-400",   icon: <PenLine className="w-4 h-4" /> },
  PROJECT_CREATED:      { label: "Projet créé",              color: "text-emerald-400",icon: <FolderPlus className="w-4 h-4" /> },
  PROJECT_DELETED:      { label: "Projet supprimé",          color: "text-red-400",    icon: <FolderX className="w-4 h-4" /> },
  PROJECT_UPDATED:      { label: "Projet modifié",           color: "text-blue-400",   icon: <FolderEdit className="w-4 h-4" /> },
};

function formatDetails(action: string, details: Record<string, unknown>): string {
  if (action === "TRANSACTION_CREATED" || action === "TRANSACTION_UPDATED") {
    return `${details.type === "income" ? "Revenu" : "Dépense"} · ${details.montant} € · ${details.category ?? "—"}`;
  }
  if (action === "TRANSACTION_DELETED") return `#${details.id_transaction}`;
  if (action === "PROJECT_CREATED" || action === "PROJECT_UPDATED") return String(details.name ?? "");
  if (action === "PROJECT_DELETED") return `Projet #${details.id_project}`;
  if (action.startsWith("LOGIN")) return String(details.email ?? "");
  return "";
}

export default function LogsPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user").then(r => r.json()).then(setUser).catch(() => null);
    fetch("/api/logs")
      .then(r => r.json())
      .then(data => setLogs(Array.isArray(data) ? data : []))
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-(--bg)">
      <TopBar
        projectId={Number(projectId)}
        projectName=""
        user={user}
        onToggleSidebar={() => setSidebarOpen(o => !o)}
      />
      <div className="flex pt-20">
        <SideBar
          projectId={Number(projectId)}
          onAddTransaction={() => {}}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 lg:p-8 space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-(--text)">Journal d&apos;activité</h1>
            <p className="text-(--text-muted) text-sm mt-1">
              Historique des actions stocké dans MongoDB (NoSQL)
            </p>
          </div>

          <NeumorphicCard padding="lg">
            {loading ? (
              <p className="text-(--text-muted) text-sm">Chargement…</p>
            ) : logs.length === 0 ? (
              <p className="text-(--text-muted) text-sm">Aucun événement enregistré pour le moment.</p>
            ) : (
              <ul className="divide-y divide-(--border)">
                {logs.map((log) => {
                  const meta = ACTION_META[log.action] ?? {
                    label: log.action,
                    color: "text-(--text)",
                    icon: null,
                  };
                  const detail = formatDetails(log.action, log.details);
                  return (
                    <li key={log._id} className="flex items-start gap-4 py-3">
                      <div className={`mt-0.5 shrink-0 ${meta.color}`}>{meta.icon}</div>
                      <div className="flex-1 min-w-0">
                        <span className={`font-semibold text-sm ${meta.color}`}>{meta.label}</span>
                        {detail && (
                          <span className="ml-2 text-sm text-(--text-muted) truncate">{detail}</span>
                        )}
                      </div>
                      <time className="text-xs text-(--text-muted) shrink-0">
                        {new Date(log.timestamp).toLocaleString("fr-FR", {
                          day: "2-digit", month: "short",
                          hour: "2-digit", minute: "2-digit",
                        })}
                      </time>
                    </li>
                  );
                })}
              </ul>
            )}
          </NeumorphicCard>
        </main>
      </div>
    </div>
  );
}
