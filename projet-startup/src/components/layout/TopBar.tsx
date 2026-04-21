"use client";

import { TrendingUp, User, LogOut, Menu } from "lucide-react";
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
  onToggleSidebar,
}: {
  projectId: number;
  projectName: string;
  user: User;
  onToggleSidebar?: () => void;
}) {
  const pathname = usePathname();
  const getTitle = () => {
    if (pathname === `/dashboard/${projectId}`) return "Tableau de bord";
    if (pathname === `/dashboard/${projectId}/projets`) return "Projets";
    if (pathname === `/dashboard/${projectId}/transactions`)
      return "Transactions";
    if (pathname === `/dashboard/${projectId}/rapports`) return "Rapports";
    if (pathname === `/dashboard/${projectId}/parametres`) return "Paramètres";
  };

  const getComment = () => {
    if (pathname === `/dashboard/${projectId}`)
      return `Projet : ${projectName}`;
    if (pathname === `/dashboard/${projectId}/projets`)
      return "Gérez vos projets";
    if (pathname === `/dashboard/${projectId}/transactions`)
      return "Gérez vos revenus et dépenses";
    if (pathname === `/dashboard/${projectId}/rapports`)
      return "Analysez vos performances";
    if (pathname === `/dashboard/${projectId}/parametres`)
      return "Configurez votre compte";
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/auth";
  };
  return (
    <header className="sticky bg-gradient-to-r from-white via-gray-50 to-white border-b border-gray-200 top-0 z-100 backdrop-blur-sm particles w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Gauche : burger + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] hover:shadow-[6px_6px_12px_#b8b8b8,-6px_-6px_12px_#ffffff] transition-all duration-200"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  <div className="absolute rounded-full -top-1 -right-1 bg-gradient-to-br from-emerald-400 to-green-500 w-4 h-4 border-2 border-white"></div>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold">StartUpLab</h1>
                <p className="text-sm font-medium text-gray-500">
                  Gestion financière optimisée
                </p>
              </div>
            </div>
          </div>

          {/* Centre : titre de page */}
          <div className="hidden sm:flex flex-col items-center text-gray-500">
            <h2 className="text-xl text-blue-950 font-bold">{getTitle()}</h2>
            <p className="text-sm">{getComment()}</p>
          </div>

          {/* Droite : user + logout */}
          <div className="flex items-center gap-2">
            <div className="relative flex items-center gap-2 rounded-2xl p-2 shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] hover:shadow-[6px_6px_12px_#b8b8b8,-6px_-6px_12px_#ffffff] transition-all duration-200">
              <div className="hidden sm:flex flex-col text-right text-sm">
                <h2 className="font-semibold">{user.nom_complet}</h2>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
                <User className="w-5 h-5 text-white" />
                <div className="absolute w-4 h-4 rounded-full -bottom-1 -right-1 bg-gradient-to-br from-emerald-400 to-green-500 border-2 border-white"></div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] hover:shadow-[6px_6px_12px_#b8b8b8,-6px_-6px_12px_#ffffff] transition-all duration-200"
            >
              <LogOut className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
