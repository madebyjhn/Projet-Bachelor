"use client";

import { useState, useEffect } from "react";
import SideBar from "../../../components/layout/SideBar";
import TransactionForm from "../../../components/transactions/TransactionForm";
import TopBar from "../../../components/layout/TopBar";
import { NeumorphicCard } from "../../../components/ui/NeumorphicCard";
import { TrendingUp, TrendingDown, HandCoins, Percent } from "lucide-react";
import { LineChart, PieChart } from "@mui/x-charts";
import { log } from "../../../../node_modules/handlebars/types/index.d";
import height from "../../../../node_modules/dom-helpers/cjs/height.d";

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

type Stats = {
  total_revenus: number;
  total_depenses: number;
  benefice: number;
  rentabilite: number;
};

type Transaction = {
  date: string;
  type: "income" | "expense";
  montant: number;
};

type CategoryStat = {
  nom: string;
  count: number;
  total: number;
};

function useChartData(transactions: Transaction[]) {
  const byDate = new Map<string, { revenus: number; depenses: number }>();

  for (const tx of transactions) {
    const entry = byDate.get(tx.date) ?? { revenus: 0, depenses: 0 };
    if (tx.type === "income") entry.revenus += Number(tx.montant);
    else entry.depenses += Number(tx.montant);
    byDate.set(tx.date, entry);
  }

  let cumulSolde = 0;
  return Array.from(byDate.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, { revenus, depenses }]) => {
      cumulSolde += revenus - depenses;
      return { date, revenus, depenses, solde: cumulSolde };
    });
}

export default function Dashboard({
  project,
  projectId,
  user,
  transactions: initialTransactions = [],
}: {
  project: Project;
  projectId: number;
  user: User;
  transactions?: Transaction[];
}) {
  const fetchCategoryStats = () => {
    fetch(`/api/category/stats?id_project=${projectId}`).then((r) =>
      r.json().then((data) => {
        console.log(data);
        setCategoryStats(data);
      }),
    );
  };
  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);
  const COLORS = [
    "#6366f1",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
    "#f43f5e",
  ];

  useEffect(() => {
    fetchCategoryStats();
  }, [projectId]);

  const [openTransaction, setOpenTransaction] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [stats, setStats] = useState<Stats>({
    total_revenus: project.total_revenus,
    total_depenses: project.total_depenses,
    benefice: project.benefice,
    rentabilite: project.rentabilite,
  });

  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);

  const handleTransactionSuccess = (newStats: Stats, newTx: Transaction) => {
    setStats(newStats);
    setTransactions((prev) =>
      [...prev, newTx].sort((a, b) => a.date.localeCompare(b.date)),
    );
    fetchCategoryStats();
    setOpenTransaction(false);
  };

  const chartData = useChartData(transactions);

  const dates = chartData.map((d) => new Date(d.date));
  const revenus = chartData.map((d) => d.revenus);
  const depenses = chartData.map((d) => d.depenses);
  const solde = chartData.map((d) => d.solde);

  const rentabiliteColor =
    stats.rentabilite >= 0 ? "text-emerald-600" : "text-red-600";
  const rentabiliteBg =
    stats.rentabilite >= 0 ? "bg-emerald-100" : "bg-red-100";

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar
        projectId={projectId}
        projectName={project.name}
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
          <div className="grid grid-cols-2 lg:grid-cols-4 w-full gap-4">
            <NeumorphicCard className="flex flex-row p-4 justify-between items-center">
              <div>
                <h1 className="text-sm text-gray-500 pb-1">Revenus totaux</h1>
                <p className="font-bold text-xl sm:text-2xl text-emerald-600">
                  {stats.total_revenus.toLocaleString("fr-FR")} €
                </p>
              </div>
              <div className="flex w-12 h-12 rounded-xl bg-emerald-100 items-center justify-center text-emerald-600">
                <TrendingUp />
              </div>
            </NeumorphicCard>

            <NeumorphicCard className="flex flex-row p-4 justify-between items-center">
              <div>
                <h1 className="text-sm text-gray-500 pb-1">Dépenses totales</h1>
                <p className="font-bold text-xl sm:text-2xl text-red-600">
                  {stats.total_depenses.toLocaleString("fr-FR")} €
                </p>
              </div>
              <div className="flex w-12 h-12 rounded-xl bg-red-100 items-center justify-center text-red-600">
                <TrendingDown />
              </div>
            </NeumorphicCard>

            <NeumorphicCard className="flex flex-row p-4 justify-between items-center">
              <div>
                <h1 className="text-sm text-gray-500 pb-1">Bénéfice net</h1>
                <p
                  className={`font-bold text-xl sm:text-2xl ${stats.benefice >= 0 ? "text-emerald-600" : "text-red-600"}`}
                >
                  {stats.benefice.toLocaleString("fr-FR")} €
                </p>
              </div>
              <div
                className={`flex w-12 h-12 rounded-xl ${stats.benefice >= 0 ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"} items-center justify-center`}
              >
                <HandCoins />
              </div>
            </NeumorphicCard>

            <NeumorphicCard className="flex flex-row p-4 justify-between items-center">
              <div>
                <h1 className="text-sm text-gray-500 pb-1">Rentabilité</h1>
                <p
                  className={`font-bold text-xl sm:text-2xl ${rentabiliteColor}`}
                >
                  {(stats.rentabilite * 100).toFixed(2)} %
                </p>
              </div>
              <div
                className={`flex w-12 h-12 rounded-xl ${rentabiliteBg} ${rentabiliteColor} items-center justify-center`}
              >
                <Percent />
              </div>
            </NeumorphicCard>
          </div>

          {/* LineChart courbes */}
          <NeumorphicCard className="p-4">
            <h2 className="text-m font-semibold text-gray-600 mb-4">
              Revenus · Dépenses · Solde cumulé
            </h2>

            {chartData.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
                Aucune transaction pour l&apos;instant. Ajoutez-en une pour voir
                le graphique.
              </div>
            ) : (
              <LineChart
                xAxis={[
                  {
                    data: dates,
                    scaleType: "time",
                    valueFormatter: (d: Date) =>
                      d.toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                      }),
                  },
                ]}
                series={[
                  {
                    data: revenus,
                    label: "Revenus",
                    color: "#8b5cf6",
                    curve: "monotoneX",
                    showMark: false,
                  },
                  {
                    data: depenses,
                    label: "Dépenses",
                    color: "#f43f5e",
                    curve: "monotoneX",
                    showMark: false,
                  },
                  {
                    data: solde,
                    label: "Solde cumulé",
                    color: "#10b981",
                    curve: "monotoneX",
                    showMark: false,
                  },
                ]}
                height={300}
                margin={{ left: 60, right: 20, top: 10, bottom: 40 }}
              />
            )}
          </NeumorphicCard>

          <div className="flex flex-col lg:flex-row w-full gap-4">
            {/* PieChart catégories */}
            <NeumorphicCard className="w-full lg:w-1/2">
              <h2 className="text-m font-semibold text-gray-600 mb-4">
                Répartition des dépenses
              </h2>
              {categoryStats.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
                  Aucune transaction pour l&apos;instant. Ajoutez-en une pour
                  voir le graphique.
                </div>
              ) : (
                <PieChart
                  colors={[
                    "#6366f1",
                    "#10b981",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                    "#06b6d4",
                    "#f43f5e",
                  ]}
                  series={[
                    {
                      data: categoryStats.map((c, i) => ({
                        id: i,
                        value: c.count,
                        label: c.nom,
                      })),
                      arcLabel: (item) => {
                        const total = categoryStats.reduce(
                          (sum, x) => sum + x.count,
                          0,
                        );
                        return `${item.label} ${((item.value / total) * 100).toFixed(1)}%`;
                      },
                      arcLabelMinAngle: 10,
                      labelRadius: 160,
                      outerRadius: 110,
                    },
                  ]}
                  height={320}
                  margin={{ top: 40, bottom: 40, left: 80, right: 80 }}
                  slotProps={{ legend: { hidden: true } }}
                  sx={{
                    "& .MuiPieArcLabel-root": {
                      fontWeight: 600,
                      fontSize: "0.75rem",
                    },
                  }}
                />
              )}
            </NeumorphicCard>

            {/* Liste catégories */}
            <NeumorphicCard className="w-full lg:w-1/2 p-4">
              <h2 className="text-m font-semibold text-gray-600 mb-4">
                Catégories
              </h2>
              <div className="space-y-2 px-2">
                {categoryStats.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-all duration-300 hover:scale-105 group cursor-pointer"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full group-hover:scale-125 transition-transform duration-300"
                        style={{ backgroundColor: COLORS[i % COLORS.length] }}
                      />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                        {c.nom}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 font-semibold group-hover:text-violet-600 transition-colors duration-300">
                      {Number(c.total).toLocaleString("fr-FR", {
                        minimumFractionDigits: 2,
                      })}
                      €
                    </span>
                  </div>
                ))}
              </div>
            </NeumorphicCard>
          </div>
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
              onClose={() => setOpenTransaction(false)}
              onSuccess={handleTransactionSuccess}
              projectId={projectId}
            />
          </div>
        </div>
      )}
    </div>
  );
}
