"use client";

import { TrendingUp, User, LogOut, Menu, Sun, Moon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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

  const btnClass =
    "flex items-center justify-center rounded-xl transition-all duration-200 " +
    "shadow-[4px_4px_8px_var(--neu-sm-dark),-4px_-4px_8px_var(--neu-sm-light)] " +
    "hover:shadow-[6px_6px_12px_var(--neu-sm-dark),-6px_-6px_12px_var(--neu-sm-light)]";

  return (
    <header className="sticky bg-(--card-bg) border-b border-(--border) top-0 z-100 backdrop-blur-sm w-full transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Gauche : burger + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className={`lg:hidden w-10 h-10 ${btnClass}`}
            >
              <Menu className="w-5 h-5 text-(--text-muted)" />
            </button>

            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-linear-to-br from-violet-500 via-purple-600 to-indigo-600 flex items-center justify-center text-white">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  <div className="absolute rounded-full -top-1 -right-1 bg-linear-to-br from-emerald-400 to-green-500 w-4 h-4 border-2 border-(--card-bg)"></div>
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-(--text)">StartUpLab</h1>
                <p className="text-sm font-medium text-(--text-muted)">
                  Gestion financière optimisée
                </p>
              </div>
            </div>
          </div>

          {/* Centre : titre de page */}
          <div className="hidden sm:flex flex-col items-center text-(--text-muted)">
            <h2 className="text-xl font-bold text-(--text)">{getTitle()}</h2>
            <p className="text-sm">{getComment()}</p>
          </div>

          {/* Droite : thème + user + logout */}
          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className={`w-10 h-10 sm:w-11 sm:h-11 ${btnClass}`}
                aria-label="Basculer le thème"
              >
                {resolvedTheme === "dark"
                  ? <Sun className="w-5 h-5 text-yellow-400" />
                  : <Moon className="w-5 h-5 text-(--text-muted)" />}
              </button>
            )}
            <div className={`relative flex items-center gap-2 rounded-2xl p-2 ${btnClass}`}>
              <div className="hidden sm:flex flex-col text-right text-sm">
                <h2 className="font-semibold text-(--text)">{user.nom_complet}</h2>
                <p className="text-xs text-(--text-muted)">{user.email}</p>
              </div>
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-purple-600">
                <User className="w-5 h-5 text-white" />
                <div className="absolute w-4 h-4 rounded-full -bottom-1 -right-1 bg-linear-to-br from-emerald-400 to-green-500 border-2 border-(--card-bg)"></div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className={`w-10 h-10 sm:w-11 sm:h-11 ${btnClass}`}
            >
              <LogOut className="w-5 h-5 text-(--text-muted)" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
