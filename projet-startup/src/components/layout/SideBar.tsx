"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CreditCard,
  Plus,
  House,
  FolderOpen,
  ChartColumn,
  Settings,
} from "lucide-react";
import { NeumorphicCard } from "../ui/NeumorphicCard";

export default function SideBar({
  projectId,
  onAddTransaction,
  isOpen = false,
  onClose,
}: {
  projectId: number;
  onAddTransaction: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();

  const isDashboardActive = pathname === `/dashboard/${projectId}`;

  const isActive = (href: string) => {
    return pathname === href;
  };

  const linkBase =
    "w-full flex items-center space-x-4 font-semibold rounded-xl px-5 py-4 transition-all duration-200";
  const linkActive =
    "text-white text-lg bg-linear-to-r from-violet-500 to-violet-600";
  const linkInactive =
    "text-(--text) hover:bg-violet-500/10 hover:text-violet-500";

  return (
    <aside
      className={`
        fixed top-20 left-0 h-[calc(100vh-5rem)] z-40 w-80
        bg-(--bg) border-r-2 border-(--border)
        p-4 lg:p-6 overflow-y-auto transition-all duration-300 ease-in-out
        lg:sticky lg:top-20 lg:self-start lg:h-[calc(100vh-5rem)] lg:translate-x-0 lg:z-30
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3"></div>

        <nav className="space-y-3">
          <button
            type="button"
            className="w-full rounded-xl font-semibold transition-all duration-300 ease-out active:scale-95 transform hover:-translate-y-0.5 group relative overflow-hidden bg-linear-to-r from-violet-500 to-purple-600 text-white flex items-center justify-center gap-3 py-4 px-6 text-lg shadow-[4px_4px_8px_var(--neu-sm-dark),-4px_-4px_8px_var(--neu-sm-light)] hover:shadow-[6px_6px_12px_var(--neu-sm-dark),-6px_-6px_12px_var(--neu-sm-light)] hover:from-violet-600 hover:to-purple-700"
            onClick={() => {
              onAddTransaction();
              onClose?.();
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700" />
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
            <span>
              Ajouter <br /> Transaction
            </span>
          </button>

          <NeumorphicCard padding="md">
            <div className="mb-3">
              <h3 className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider mb-4">
                🧭 Navigation
              </h3>
            </div>
            <div className="flex justify-between">
              <Link
                href={`/dashboard/${projectId}`}
                onClick={onClose}
                className={`${linkBase} ${isDashboardActive ? linkActive : linkInactive}`}
              >
                <House /> <span>Dashboard</span>
              </Link>
            </div>
            <div className="flex justify-between mt-2">
              <Link
                href={`/dashboard/${projectId}/projets`}
                onClick={onClose}
                className={`${linkBase} ${isActive(`/dashboard/${projectId}/projets`) ? linkActive : linkInactive}`}
              >
                <FolderOpen /> <span>Projets</span>
              </Link>
            </div>
            <div className="flex justify-between mt-1.5">
              <Link
                href={`/dashboard/${projectId}/transactions`}
                onClick={onClose}
                className={`${linkBase} ${isActive(`/dashboard/${projectId}/transactions`) ? linkActive : linkInactive}`}
              >
                <CreditCard /> <span>Transactions</span>
              </Link>
            </div>
            <div className="flex justify-between mt-1">
              <Link
                href={`/dashboard/${projectId}/rapports`}
                onClick={onClose}
                className={`${linkBase} ${isActive(`/dashboard/${projectId}/rapports`) ? linkActive : linkInactive}`}
              >
                <ChartColumn /> <span>Rapports</span>
              </Link>
            </div>
            <div className="flex justify-between mt-1">
              <Link
                href={`/dashboard/${projectId}/settings`}
                onClick={onClose}
                className={`${linkBase} ${isActive(`/dashboard/${projectId}/parametres`) ? linkActive : linkInactive}`}
              >
                <Settings /> <span>Paramètres</span>
              </Link>
            </div>
          </NeumorphicCard>
        </nav>
      </div>
    </aside>
  );
}
