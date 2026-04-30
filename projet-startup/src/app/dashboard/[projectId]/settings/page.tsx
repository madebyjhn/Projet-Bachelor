"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TopBar from "../../../../components/layout/TopBar";
import SideBar from "../../../../components/layout/SideBar";
import TransactionForm from "../../../../components/transactions/TransactionForm";
import { NeumorphicCard } from "../../../../components/ui/NeumorphicCard";
import { User, Save } from "lucide-react";

type User = {
  nom_complet: string;
  email: string;
  url_avatar: string;
};

export default function Projets() {
  const [openTransaction, setOpenTransaction] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [nomComplet, setNomComplet] = useState("");
  const [email, setEmail] = useState("");

  const params = useParams<{ projectId: string | string[] }>();
  const projectIdRaw = Array.isArray(params.projectId)
    ? params.projectId[0]
    : params.projectId;
  const projectId = Number(projectIdRaw);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setNomComplet(data.nom_complet);
        setEmail(data.email);
      })
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
          {/* Infos de profil */}
          <NeumorphicCard className="p-4">
            {/* Logo + titre/description*/}
            <div className="flex flex-row items-center">
              <div className="flex justify-center items-center w-10 h-10 bg-linear-to-br from-violet-200 to-purple-300 rounded-xl">
                <User className="text-violet-500" />
              </div>
              <div className="pl-4">
                <h2 className="text-xl font-bold">Informations du profil</h2>
                <p className="text-s text-gray-600">
                  Gérez vos informations personnelles
                </p>
              </div>
            </div>
            {/* Formulaire */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nomComplet}
                  onChange={(e) => setNomComplet(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#b8b8b8,inset_-6px_-6px_12px_#ffffff] transition-shadow text-gray-700"
                />
              </div>
              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#b8b8b8,inset_-6px_-6px_12px_#ffffff] transition-shadow text-gray-700"
                />
              </div>
            </div>
            {/* Bouton de sauvegarde */}
            <button className="flex flex-row py-3 px-6 mt-4 bg-gradient-to-r from-violet-500 to-purple-600 shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] hover:shadow-[6px_6px_12px_#b8b8b8,-6px_-6px_12px_#ffffff] hover:from-violet-600 hover:to-purple-700 rounded-xl text-white justify-center items-center space-x-2 transition-all duration-300 ease-out active:scale-95 transform hover:-translate-y-0.5 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
              <Save className="w-4 h-4" />
              <span className="">Sauvegarder</span>
            </button>
          </NeumorphicCard>
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
