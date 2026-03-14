"use client";

import { useState } from "react";
import SideBar from "../../../components/layout/SideBar";
import TransactionForm from "./transactions/page";
import TopBar from "../../../components/layout/TopBar";

type Project = {
  name: string;
  total_revenus: number;
  total_depenses: number;
  benefice: number;
  rentabilite: number;
};

type User = {
  nom_complet: string;
  email: string;
  url_avatar: string;
};

export default function Dashboard({
  project,
  projectId,
  user,
}: {
  project: Project;
  projectId: number;
  user: User;
}) {
  const [openTransaction, setOpenTransaction] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar projectId={projectId} projectName={project.name} user={user} />

      <div className="flex flex-1">
        <SideBar
          projectId={projectId}
          onAddTransaction={() => setOpenTransaction(true)}
        />

        <main className="flex-1 p-6">
          <div className="max-w-3xl">
            <p className="text-xl font-semibold">
              Bienvenue sur votre projet {project.name}
            </p>
            <p className="mt-4">Revenus totaux : {project.total_revenus}</p>
            <p>Dépenses totales : {project.total_depenses}</p>
            <p>Bénéfice : {project.benefice}</p>
            <p>Rentabilité : {(project.rentabilite * 100).toFixed(2)} %</p>
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
              projectId={projectId}
            />
          </div>
        </div>
      )}
    </div>
  );
}
