"use client";

import { useState } from "react";
import SideBar from "../../../components/layout/SideBar";
import TransactionForm from "./transactions/page";
import TopBar from "../../../components/layout/TopBar";
import { NeumorphicCard } from "../../../components/ui/NeumorphicCard";
import { TrendingUp, TrendingDown, HandCoins } from "lucide-react";
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
          <div className="flex flex-row w-full">
            <NeumorphicCard className="flex flex-row w-1/4 mr-5 p-2 justify-between">
              <div>
                <h1 className="text-sm text-gray-700 pb-1">Revenus Totaux</h1>
                <p className="font-bold text-2xl text-emerald-600">
                  {`${project.total_revenus} €`}
                </p>
              </div>
              <div className="flex w-12 h-12 rounded-xl bg-emerald-100 items-center justify-center text-emerald-600">
                <TrendingUp />
              </div>
            </NeumorphicCard>
            <NeumorphicCard className="flex flex-row w-1/4 mr-5 p-2 justify-between">
              <div>
                <h1 className="text-sm text-gray-700 pb-1">Dépenses Totales</h1>
                <p className="font-bold text-2xl text-red-600">
                  {`${project.total_depenses} €`}
                </p>
              </div>
              <div className="flex w-12 h-12 rounded-xl bg-red-100 items-center justify-center text-red-600">
                <TrendingDown />
              </div>
            </NeumorphicCard>
            <NeumorphicCard className="flex flex-row w-1/4 mr-5 p-2 justify-between">
              <div>
                <h1 className="text-sm text-gray-700 pb-1">Bénéfice Net</h1>
                <p className="font-bold text-2xl text-emerald-600">
                  {`${project.benefice} €`}
                </p>
              </div>
              <div className="flex w-12 h-12 rounded-xl bg-emerald-100 items-center justify-center text-emerald-600">
                <HandCoins />
              </div>
            </NeumorphicCard>
            <NeumorphicCard className="flex flex-row w-1/4 mr-5 p-2 justify-between">
              <div>
                <h1 className="text-sm text-gray-700 pb-1">Rentabilité</h1>
                <p className="font-bold text-2xl text-red-600">
                  {`${project.rentabilite}%`}
                </p>
              </div>
              <div className="flex w-12 h-12 rounded-xl bg-red-100 items-center justify-center text-red-600">
                <TrendingDown />
              </div>
            </NeumorphicCard>
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
