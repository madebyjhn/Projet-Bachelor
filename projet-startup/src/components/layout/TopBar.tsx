"use client";

import { TrendingUp } from "lucide-react";
import { usePathname } from "next/navigation";

type User = {
  nom_complet: string;
  email: string;
  url_avatar: string;
};

export default function TopBar({
  projectId,
  projectName,
  user,
}: {
  projectId: number;
  projectName: string;
  user: User;
}) {
  const pathname = usePathname();
  const getTitle = () => {
    if (pathname === `/dashboard/${projectId}`) return "Tableau de bord";
    if (pathname === `/dashboard/${projectId}/projets`) return "Projets";
    if (pathname === `/dashboard/${projectId}/histotransactions`)
      return "Transactions";
    if (pathname === `/dashboard/${projectId}/rapports`) return "Rapports";
    if (pathname === `/dashboard/${projectId}/parametres`) return "Paramètres";
  };

  const getComment = () => {
    if (pathname === `/dashboard/${projectId}`)
      return `Projet : ${projectName}`;
    if (pathname === `/dashboard/${projectId}/projets`)
      return "Gérez vos projets";
    if (pathname === `/dashboard/${projectId}/histotransactions`)
      return "Gérez vos revenus et dépenses";
    if (pathname === `/dashboard/${projectId}/rapports`)
      return "Analysez vos performances";
    if (pathname === `/dashboard/${projectId}/parametres`)
      return "Configurez votre compte";
  };
  return (
    <header className="sticky bg-gradient-to-r from-white via-gray-50 to-white border-b border-gray-200 top-0 z-100 backdrop-blur-sm particles w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/*Logo*/}
          <div className="flex space-x-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white">
                <TrendingUp />
                <div className="absolute rounded-full -top-1 -right-1 bg-gradient-to-br from-emerald-400 to-green-500 w-4 h-4 border-2 border-chite"></div>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold">StartUpLab</h1>
              <p className="text-sm font-medium text-gray-500">
                Gestion financière optimisée
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center text-gray-500">
            <h2 className="text-xl text-blue-950 font-bold">{getTitle()}</h2>
            <p className="text-sm">{getComment()}</p>
          </div>
          <div>
            <div>
              <div>
                <h2>{user.nom_complet}</h2>
                <p>{user.email}</p>
              </div>
              <div></div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </header>
  );
}
