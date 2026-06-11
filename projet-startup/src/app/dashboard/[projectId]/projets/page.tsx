"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import TopBar from "../../../../components/layout/TopBar";
import SideBar from "../../../../components/layout/SideBar";
import TransactionForm from "../../../../components/transactions/TransactionForm";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";
import { NeumorphicCard } from "@/components/ui/NeumorphicCard";
import { Plus, FolderOpen, Pencil, Trash2 } from "lucide-react";

type User = {
  nom_complet: string;
  email: string;
  url_avatar: string;
};

type Project = {
  id_project: number;
  name: string;
  total_revenus: number;
  total_depenses: number;
  benefice: number;
  description: string;
  transaction_count: number;
};

type ProjectForm = { nom_projet: string; description: string };

function ProjectModal({
  initial,
  onClose,
  onSubmit,
  title,
}: {
  initial?: ProjectForm;
  onClose: () => void;
  onSubmit: (data: ProjectForm) => Promise<void>;
  title: string;
}) {
  const [nom_projet, setNom] = useState(initial?.nom_projet ?? "");
  const [description, setDesc] = useState(initial?.description ?? "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (nom_projet.trim().length < 2 || description.trim().length < 5) {
      setError("Nom (min 2 car.) et description (min 5 car.) obligatoires.");
      return;
    }
    setLoading(true);
    try {
      await onSubmit({ nom_projet: nom_projet.trim(), description: description.trim() });
    } catch {
      setError("Erreur. Réessaie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-(--card-bg) p-6 shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)] space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold">{title}</h2>
        <input
          type="text"
          placeholder="Nom du projet"
          value={nom_projet}
          onChange={(e) => setNom(e.target.value)}
          className="w-full rounded-xl border border-(--border) bg-(--bg) px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          rows={3}
          className="w-full rounded-xl border border-(--border) bg-(--bg) px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400 resize-none"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm font-semibold text-(--text-muted) hover:bg-gray-100 transition"
          >
            Annuler
          </button>
          <NeumorphicButton onClick={handleSubmit} disabled={loading}>
            {loading ? "..." : "Confirmer"}
          </NeumorphicButton>
        </div>
      </div>
    </div>
  );
}

export default function Projets() {
  const router = useRouter();
  const [openTransaction, setOpenTransaction] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [modal, setModal] = useState<"create" | "edit" | null>(null);
  const [editTarget, setEditTarget] = useState<Project | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const params = useParams<{ projectId: string | string[] }>();
  const projectIdRaw = Array.isArray(params.projectId)
    ? params.projectId[0]
    : params.projectId;
  const projectId = Number(projectIdRaw);

  const loadProjects = () =>
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(console.error);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(console.error);
    loadProjects();
  }, []);

  const handleCreate = async (data: ProjectForm) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error();
    await loadProjects();
    setModal(null);
  };

  const handleEdit = async (data: ProjectForm) => {
    const res = await fetch("/api/projects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_project: editTarget!.id_project, ...data }),
    });
    if (!res.ok) throw new Error();
    await loadProjects();
    setModal(null);
    setEditTarget(null);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/projects?id_project=${id}`, { method: "DELETE" });
    await loadProjects();
    setConfirmDelete(null);
    if (id === projectId && projects.length > 1) {
      const next = projects.find((p) => p.id_project !== id);
      if (next) router.push(`/dashboard/${next.id_project}/projets`);
    }
  };

  if (!Number.isFinite(projectId) || !user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar
        projectId={projectId}
        projectName=""
        user={user}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
      />
      <div className="flex flex-1">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <SideBar
          projectId={projectId}
          onAddTransaction={() => setOpenTransaction(true)}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-3 sm:p-6 space-y-4 sm:space-y-6 min-w-0">
          {/* Titre + bouton nouveau projet */}
          <div className="flex flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Mes Projets</h1>
              <p className="text-gray-600">Gérez tous vos projets financiers</p>
            </div>
            <NeumorphicButton
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setModal("create")}
            >
              Nouveau Projet
            </NeumorphicButton>
          </div>

          {/* CRUD des projets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((p) => (
              <div
                key={p.id_project}
                onClick={() => router.push(`/dashboard/${p.id_project}`)}
                className="cursor-pointer"
              >
              <NeumorphicCard
                hover
                className={`p-5 relative ${p.id_project === projectId ? "ring-2 ring-violet-500" : ""}`}
              >
                {/* Dot coloré */}
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-violet-400" />

                {/* Header */}
                <div className="flex items-start gap-3 pr-6">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center">
                    <FolderOpen className="w-5 h-5 text-violet-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-violet-600 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400 truncate">{p.description}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Bénéfice Net</span>
                    <span className={p.benefice >= 0 ? "font-semibold text-emerald-600" : "font-semibold text-red-500"}>
                      {Number(p.benefice).toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Revenus</span>
                    <span className="font-semibold text-emerald-600">
                      {Number(p.total_revenus).toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Dépenses</span>
                    <span className="font-semibold text-red-500">
                      {Number(p.total_depenses).toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                    </span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-500">Transactions</span>
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                      {p.transaction_count}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div
                  className="mt-4 flex gap-2 justify-end"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => { setEditTarget(p); setModal("edit"); }}
                    className="p-1.5 rounded-lg hover:bg-violet-50 text-gray-400 hover:text-violet-600 transition"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  {confirmDelete === p.id_project ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(p.id_project)}
                        className="text-xs px-2 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        Confirmer
                      </button>
                      <button
                        onClick={() => setConfirmDelete(null)}
                        className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(p.id_project)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </NeumorphicCard>
              </div>
            ))}
          </div>
        </main>
      </div>

      {openTransaction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpenTransaction(false)}
        >
          <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <TransactionForm
              onClose={() => setOpenTransaction(false)}
              onSuccess={() => setOpenTransaction(false)}
              projectId={projectId}
            />
          </div>
        </div>
      )}

      {modal === "create" && (
        <ProjectModal
          title="Nouveau Projet"
          onClose={() => setModal(null)}
          onSubmit={handleCreate}
        />
      )}

      {modal === "edit" && editTarget && (
        <ProjectModal
          title="Modifier le projet"
          initial={{ nom_projet: editTarget.name, description: editTarget.description }}
          onClose={() => { setModal(null); setEditTarget(null); }}
          onSubmit={handleEdit}
        />
      )}
    </div>
  );
}
