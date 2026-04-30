"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TopBar from "../../../../components/layout/TopBar";
import SideBar from "../../../../components/layout/SideBar";
import TransactionForm from "../../../../components/transactions/TransactionForm";
import { NeumorphicCard } from "../../../../components/ui/NeumorphicCard";
import {
  TrendingUp,
  TrendingDown,
  Pencil,
  Trash2,
  Calendar,
  Euro,
  ArrowUpDown,
} from "lucide-react";

type User = {
  nom_complet: string;
  email: string;
  url_avatar: string;
};

type Transaction = {
  id_transaction: number;
  description: string;
  type: "income" | "expense";
  date: string;
  montant: number;
  category_name: string;
};

export default function TransactionPage() {
  const [openTransaction, setOpenTransaction] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Mise en place des filtres

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "montant">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const filtered = transactions
    .filter((t) => t.description.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => !filterType || t.type === filterType)
    .filter((t) => !filterCategory || t.category_name === filterCategory)
    .sort((a, b) => {
      const sign = (t: Transaction) =>
        t.type === "expense" ? -t.montant : t.montant;
      const v =
        sortBy === "date" ? a.date.localeCompare(b.date) : sign(a) - sign(b);
      return sortOrder === "asc" ? v : -v;
    });

  const categories = [...new Set(filtered.map((t) => t.category_name))];

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

    fetch(`/api/transaction?id_project=${projectId}`)
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, [projectId]);

  if (!Number.isFinite(projectId) || !user) return null;

  const handleDeleteTransaction = (id_transaction: number) => {
    fetch(`/api/transaction?id_transaction=${id_transaction}`, {
      method: "DELETE",
    }).then(() => {
      setTransactions((prev) =>
        prev.filter((t) => t.id_transaction !== id_transaction),
      );
    });
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
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
          {/* Barre de filtrage */}
          <NeumorphicCard className="flex flex-col gap-4">
            <div className="grid grid-cols-8 gap-6 mb-3">
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="col-start-1 col-end-3 px-4 py-3 bg-gray-100 rounded-xl border-none outline-none shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#b8b8b8,inset_-6px_-6px_12px_#ffffff] transition-shadow text-gray-700"
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="col-start-3 col-end-5 px-4 py-3 bg-gray-100 rounded-xl border-none outline-none shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#b8b8b8,inset_-6px_-6px_12px_#ffffff] transition-shadow text-gray-700"
              >
                <option value="">Tous les types</option>
                <option value="income">Revenus</option>
                <option value="expense">Dépenses</option>
              </select>

              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="col-start-5 col-end-7 px-4 py-3 bg-gray-100 rounded-xl border-none outline-none shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#b8b8b8,inset_-6px_-6px_12px_#ffffff] transition-shadow text-gray-700"
              >
                <option value="">Toutes les catégories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  setSortBy("date");
                  setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
                }}
                className={`rounded-xl transition-all duration-200 flex items-center justify-center gap-1 px-3 py-2 ${sortBy === "date" ? "text-white bg-linear-to-r from-violet-500 to-violet-600" : "hover:bg-gray-200"}`}
              >
                <Calendar className="w-4 h-4" />
                <ArrowUpDown className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setSortBy("montant");
                  setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
                }}
                className={`rounded-xl transition-all duration-200 flex items-center justify-center gap-1 px-3 py-2 ${sortBy === "montant" ? "text-white bg-linear-to-r from-violet-500 to-violet-600" : "hover:bg-gray-200"}`}
              >
                <Euro className="w-4 h-4" />
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-500">
              {filtered.length}
              {filtered.length === 1
                ? " transaction trouvée"
                : " transactions trouvées"}
            </p>
          </NeumorphicCard>

          {/* Liste des transactions */}
          <NeumorphicCard className="flex flex-col gap-4 animate-slide-up">
            <h1 className="font-bold text-2xl">Transactions</h1>
            <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden max-h-96">
              {filtered.map((t, i) => (
                <div
                  key={i}
                  className="flex group justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 "
                >
                  <div className="flex gap-2 min-w-0">
                    <div
                      className={`flex justify-center items-center w-10 h-10 ${t.type === "income" ? "bg-emerald-100 text-green-600" : "bg-red-100 text-red-600"}  rounded-xl`}
                    >
                      {t.type === "expense" ? (
                        <TrendingDown className="w-5 h-5" />
                      ) : (
                        <TrendingUp className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h2 className="font-semibold">{t.description}</h2>
                      <div className="flex flex-row gap-2 items-center">
                        <p className="text-sm text-gray-500">
                          {t.category_name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(t.date).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p
                      className={`font-bold ${t.type === "income" ? "text-emerald-600" : "text-red-600"}`}
                    >
                      {t.type === "expense"
                        ? `-${t.montant} €`
                        : `+${t.montant} €`}
                    </p>
                    <div className="w-0 overflow-hidden group-hover:w-10 transition-all duration-200 flex gap-2">
                      <button
                        className="flex"
                        onClick={() => {
                          setSelectedTransaction(t);
                          setOpenTransaction(true);
                        }}
                      >
                        <Pencil className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </button>
                      <button
                        onClick={() =>
                          handleDeleteTransaction(t.id_transaction)
                        }
                        className="flex"
                      >
                        <Trash2 className="w-4 h-4 text-red-400 hover:text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </NeumorphicCard>
        </main>
      </div>

      {/* Formulaire de transactions */}
      {openTransaction && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpenTransaction(false)}
        >
          <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <TransactionForm
              onClose={() => {
                setOpenTransaction(false);
                setSelectedTransaction(null);
              }}
              onSuccess={(_, updatedTx) => {
                if (selectedTransaction && updatedTx) {
                  setTransactions((prev) =>
                    prev.map((t) =>
                      t.id_transaction === selectedTransaction.id_transaction
                        ? { ...t, ...updatedTx }
                        : t,
                    ),
                  );
                }
                setOpenTransaction(false);
                setSelectedTransaction(null);
              }}
              projectId={projectId}
              transaction={selectedTransaction ?? undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
}
