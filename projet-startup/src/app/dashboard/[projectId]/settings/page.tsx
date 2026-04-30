"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TopBar from "../../../../components/layout/TopBar";
import SideBar from "../../../../components/layout/SideBar";
import TransactionForm from "../../../../components/transactions/TransactionForm";
import { NeumorphicCard } from "../../../../components/ui/NeumorphicCard";
import { NeumorphicButton } from "../../../../components/ui/NeumorphicButton";
import { User, Save, Mail } from "lucide-react";

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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

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

  const handleEdit = async () => {
    fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom_complet: nomComplet, email }),
    });
    setUser((prev) =>
      prev ? { ...prev, nom_complet: nomComplet, email } : prev,
    );
  };

  const handleDelete = async () => {
    const res = await fetch("/api/user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/auth";
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
          {/* Infos de profil */}
          <NeumorphicCard className="p-4">
            {/* Logo + titre/description*/}
            <div className="flex flex-row items-center">
              <div className="flex justify-center items-center w-10 h-10 bg-linear-to-br from-violet-200 to-purple-300 rounded-xl">
                <User className="text-violet-500" />
              </div>
              <div className="pl-4">
                <h2 className="text-xl font-bold">Informations du profil</h2>
                <p className="text-s text-(--text-muted)">
                  Gérez vos informations personnelles
                </p>
              </div>
            </div>
            {/* Formulaire */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-(--text)">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nomComplet}
                  onChange={(e) => setNomComplet(e.target.value)}
                  className="w-full px-4 py-3 bg-(--input-bg) text-(--text) rounded-xl border-none outline-none shadow-[inset_4px_4px_8px_var(--neu-sm-dark),inset_-4px_-4px_8px_var(--neu-sm-light)] focus:shadow-[inset_6px_6px_12px_var(--neu-sm-dark),inset_-6px_-6px_12px_var(--neu-sm-light)] transition-shadow"
                />
              </div>
              <div className="space-y-2 mt-4">
                <label className="block text-sm font-medium text-(--text)">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-(--input-bg) text-(--text) rounded-xl border-none outline-none shadow-[inset_4px_4px_8px_var(--neu-sm-dark),inset_-4px_-4px_8px_var(--neu-sm-light)] focus:shadow-[inset_6px_6px_12px_var(--neu-sm-dark),inset_-6px_-6px_12px_var(--neu-sm-light)] transition-shadow"
                />
              </div>
            </div>
            {/* Bouton de sauvegarde */}
            <NeumorphicButton
              className="mt-4"
              icon={<Save className="w-4 h-4" />}
              onClick={() => setConfirmOpen(true)}
            >
              Sauvegarder
            </NeumorphicButton>
          </NeumorphicCard>

          {/* Données et suppression de compte */}
          <NeumorphicCard className="p-4">
            <div className="flex flex-row items-center gap-4">
              <div className="flex justify-center items-center w-10 h-10 bg-linear-to-br from-red-200 to-red-300 rounded-xl">
                <Mail className="text-red-500" />
              </div>

              <div className="">
                <h2 className="text-xl font-bold">Données et sécurité</h2>
                <p className="text-s text-(--text-muted)">Gérez vos données</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <NeumorphicButton
                className="text-black tracking-wide font-medium"
                color="white"
              >
                Exporter mes données
              </NeumorphicButton>
              <NeumorphicButton
                className="tracking-wide font-medium"
                color="red"
                onClick={() => setDeleteConfirmOpen(true)}
              >
                Supprimer mon compte
              </NeumorphicButton>
            </div>
            <div className="pt-8 text-xs text-(--text-muted) p-4 mt-4">
              <p className="mb-2">
                <strong>Note sur la confidentialité:</strong> Toutes vos données
                sont stockées localement dans votre navigateur. Aucune
                information n&apos;est envoyée vers des serveurs externes.
              </p>
              <p>
                Pour sauvegarder vos données, utilisez la fonction
                d&apos;export. Pour transférer vos données vers un autre
                appareil, exportez puis importez le fichier de sauvegarde.
              </p>
            </div>
          </NeumorphicCard>
        </main>
      </div>
      {/* Ajout de transaction */}
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
      {/* Confirmation des modifications */}
      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setConfirmOpen(false)}
        >
          <div
            className="bg-(--card-bg) rounded-2xl p-6 shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)] w-full max-w-sm space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-(--text)">
              Confirmer les modifications
            </h3>
            <p className="text-sm text-(--text-muted)">
              Êtes-vous sûr de vouloir sauvegarder ces changements ?
            </p>
            <div className="flex gap-3 justify-end">
              <NeumorphicButton
                variant="secondary"
                onClick={() => setConfirmOpen(false)}
              >
                Annuler
              </NeumorphicButton>
              <NeumorphicButton
                onClick={() => {
                  handleEdit();
                  setConfirmOpen(false);
                }}
              >
                Confirmer
              </NeumorphicButton>
            </div>
          </div>
        </div>
      )}
      {/* Confirmation de suppression de compte */}
      {deleteConfirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setDeleteConfirmOpen(false)}
        >
          <div
            className="bg-(--card-bg) rounded-2xl p-6 shadow-[8px_8px_16px_var(--neu-dark),-8px_-8px_16px_var(--neu-light)] w-full max-w-sm space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-red-500">
              Supprimer le compte
            </h3>
            <p className="text-sm text-(--text-muted)">
              Cette action est irréversible. Toutes vos données seront
              définitivement supprimées.
            </p>
            <div className="flex gap-3 justify-end">
              <NeumorphicButton
                variant="secondary"
                onClick={() => setDeleteConfirmOpen(false)}
              >
                Annuler
              </NeumorphicButton>
              <NeumorphicButton
                color="red"
                onClick={() => {
                  handleDelete();
                  setDeleteConfirmOpen(false);
                }}
              >
                Supprimer définitivement
              </NeumorphicButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
