"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TopBar from "../../../../components/layout/TopBar";
import SideBar from "../../../../components/layout/SideBar";
import TransactionForm from "../../../../components/transactions/TransactionForm";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";
import { Plus } from "lucide-react";

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
};

export default function Projets() {
  const [openTransaction, setOpenTransaction] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [project, setProject] = useState<Project[]>([]);

  const params = useParams<{ projectId: string | string[] }>();
  const projectIdRaw = Array.isArray(params.projectId)
    ? params.projectId[0]
    : params.projectId;
  const projectId = Number(projectIdRaw);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(console.error);

    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch(console.error);
  }, []);

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
            <NeumorphicButton icon={<Plus className="w-4 h-4" />}>
              Nouveau projet
            </NeumorphicButton>
          </div>

          {/* CRUD des projets */}
          {project.map((p, i) => (
            <div key={i}></div>
          ))}
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
    </div>
  );
}
