"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TopBar from "../../../../components/layout/TopBar";
import SideBar from "../../../../components/layout/SideBar";
import TransactionForm from "../transactions/page";

type User = {
  nom_complet: string;
  email: string;
  url_avatar: string;
};

export default function Projets() {
  const [openTransaction, setOpenTransaction] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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
      </div>
      {openTransaction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpenTransaction(false)}
        >
          <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <TransactionForm
              onClose={() => setOpenTransaction(false)}
              projectId={projectId}
            />
          </div>
        </div>
      )}
    </div>
  );
}
