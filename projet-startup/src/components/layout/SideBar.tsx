import Link from "next/link";
import { LayoutDashboard, CreditCard, BarChart3, Settings } from "lucide-react";

export default function Sidebar({ projectId }: { projectId: number }) {
  return (
    <aside className="w-64 h-screen bg-white border-r p-6 flex flex-col">
      <h1 className="text-xl font-bold mb-8">Startup Finance</h1>

      <nav className="flex flex-col gap-4">
        <Link href={`/dashboard/${projectId}`}>
          <div className="flex items-center gap-3 p-2 rounded hover:bg-zinc-100">
            <LayoutDashboard size={18} />
            Dashboard
          </div>
        </Link>

        <Link href={`/dashboard/${projectId}/transactions`}>
          <div className="flex items-center gap-3 p-2 rounded hover:bg-zinc-100">
            <CreditCard size={18} />
            Transactions
          </div>
        </Link>

        <Link href={`/dashboard/${projectId}/reports`}>
          <div className="flex items-center gap-3 p-2 rounded hover:bg-zinc-100">
            <BarChart3 size={18} />
            Rapports
          </div>
        </Link>

        <Link href={`/dashboard/${projectId}/settings`}>
          <div className="flex items-center gap-3 p-2 rounded hover:bg-zinc-100">
            <Settings size={18} />
            Paramètres
          </div>
        </Link>
      </nav>
    </aside>
  );
}
