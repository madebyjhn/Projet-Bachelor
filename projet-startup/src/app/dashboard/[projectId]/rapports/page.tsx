"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import TopBar from "../../../../components/layout/TopBar";
import SideBar from "../../../../components/layout/SideBar";
import TransactionForm from "../../../../components/transactions/TransactionForm";
import { NeumorphicCard } from "@/components/ui/NeumorphicCard";
import { NeumorphicButton } from "@/components/ui/NeumorphicButton";
import { FileText, Table2, TrendingUp, TrendingDown } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type User = { nom_complet: string; email: string; url_avatar: string };
type Transaction = {
  id_transaction: number;
  description: string;
  type: "income" | "expense";
  date: string;
  montant: number;
  category_name: string;
};

const today = () => new Date().toISOString().split("T")[0];
const monthAgo = () => {
  const d = new Date();
  d.setMonth(d.getMonth() - 1);
  return d.toISOString().split("T")[0];
};
const fmt = (d: string) =>
  new Date(d).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });

export default function RapportsPage() {
  const [openTransaction, setOpenTransaction] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [dateDebut, setDateDebut] = useState(monthAgo());
  const [dateFin, setDateFin] = useState(today());
  const [filterType, setFilterType] = useState("");
  const [filterCat, setFilterCat] = useState("");

  const printRef = useRef<HTMLDivElement>(null);

  const params = useParams<{ projectId: string | string[] }>();
  const projectIdRaw = Array.isArray(params.projectId) ? params.projectId[0] : params.projectId;
  const projectId = Number(projectIdRaw);

  useEffect(() => {
    fetch("/api/user").then((r) => r.json()).then(setUser).catch(console.error);
    fetch(`/api/transaction?id_project=${projectId}`)
      .then((r) => r.json())
      .then(setTransactions)
      .catch(console.error);
  }, [projectId]);

  const filtered = transactions.filter((t) => {
    const d = t.date.split("T")[0];
    if (d < dateDebut || d > dateFin) return false;
    if (filterType && t.type !== filterType) return false;
    if (filterCat && t.category_name !== filterCat) return false;
    return true;
  });

  const categories = [...new Set(transactions.map((t) => t.category_name))];
  const revenus = filtered.filter((t) => t.type === "income").reduce((s, t) => s + Number(t.montant), 0);
  const depenses = filtered.filter((t) => t.type === "expense").reduce((s, t) => s + Number(t.montant), 0);
  const benefice = revenus - depenses;

  const exportCSV = () => {
    const header = "Date,Description,Catégorie,Type,Montant\n";
    const rows = filtered
      .map((t) => `${fmt(t.date)},"${t.description}","${t.category_name}",${t.type === "income" ? "Revenu" : "Dépense"},${Number(t.montant).toFixed(2)}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rapport_${dateDebut}_${dateFin}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(109, 40, 217);
    doc.text("Rapport Financier", 105, 18, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Période : ${fmt(dateDebut)} – ${fmt(dateFin)}`, 105, 26, { align: "center" });

    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(`Revenus totaux : ${revenus.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €`, 14, 38);
    doc.text(`Dépenses totales : ${depenses.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €`, 14, 45);
    doc.text(`Bénéfice net : ${benefice.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €`, 14, 52);
    doc.text(`Transactions : ${filtered.length}`, 14, 59);

    autoTable(doc, {
      startY: 68,
      head: [["Date", "Description", "Catégorie", "Type", "Montant"]],
      body: filtered.map((t) => [
        fmt(t.date),
        t.description,
        t.category_name,
        t.type === "income" ? "Revenu" : "Dépense",
        `${t.type === "income" ? "+" : "-"}${Number(t.montant).toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €`,
      ]),
      headStyles: { fillColor: [109, 40, 217], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [248, 245, 255] },
      columnStyles: { 4: { halign: "right" } },
      styles: { fontSize: 9 },
    });

    doc.save(`rapport_${dateDebut}_${dateFin}.pdf`);
  };

  if (!Number.isFinite(projectId) || !user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar projectId={projectId} projectName="" user={user} onToggleSidebar={() => setSidebarOpen((o) => !o)} />
      <div className="flex flex-1">
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <SideBar
          projectId={projectId}
          onAddTransaction={() => setOpenTransaction(true)}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-3 sm:p-6 space-y-4 sm:space-y-6 min-w-0">

          {/* Paramètres */}
          <NeumorphicCard className="p-5">
            <h2 className="font-bold text-lg mb-4">Paramètres du Rapport</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Date de début</label>
                <input
                  type="date"
                  value={dateDebut}
                  onChange={(e) => setDateDebut(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-(--bg) border border-(--border) text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Date de fin</label>
                <input
                  type="date"
                  value={dateFin}
                  onChange={(e) => setDateFin(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-(--bg) border border-(--border) text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-(--bg) border border-(--border) text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                >
                  <option value="">Tous</option>
                  <option value="income">Revenus</option>
                  <option value="expense">Dépenses</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-500">Catégorie</label>
                <select
                  value={filterCat}
                  onChange={(e) => setFilterCat(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-(--bg) border border-(--border) text-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                >
                  <option value="">Toutes</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </NeumorphicCard>

          {/* Export */}
          <NeumorphicCard className="p-5 flex items-center justify-between">
            <h2 className="font-bold text-lg">Exporter le rapport</h2>
            <div className="flex gap-3">
              <NeumorphicButton variant="secondary" icon={<Table2 className="w-4 h-4" />} onClick={exportCSV}>
                CSV
              </NeumorphicButton>
              <NeumorphicButton icon={<FileText className="w-4 h-4" />} onClick={exportPDF}>
                PDF
              </NeumorphicButton>
            </div>
          </NeumorphicCard>

          {/* Rapport */}
          <div ref={printRef}>
            <NeumorphicCard className="p-5 space-y-5">
              <div className="text-center">
                <h2 className="text-xl font-bold">Rapport Financier</h2>
                <p className="text-sm text-gray-500">Période : {fmt(dateDebut)} – {fmt(dateFin)}</p>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl bg-emerald-50 p-4 text-center">
                  <p className="text-2xl font-bold text-emerald-600">
                    {revenus.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Revenus Totaux</p>
                </div>
                <div className="rounded-2xl bg-red-50 p-4 text-center">
                  <p className="text-2xl font-bold text-red-500">
                    {depenses.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Dépenses Totales</p>
                </div>
                <div className="rounded-2xl bg-violet-50 p-4 text-center">
                  <p className={`text-2xl font-bold ${benefice >= 0 ? "text-violet-600" : "text-red-500"}`}>
                    {benefice.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Bénéfice Net</p>
                </div>
                <div className="rounded-2xl bg-sky-50 p-4 text-center">
                  <p className="text-2xl font-bold text-sky-500">{filtered.length}</p>
                  <p className="text-sm text-gray-500 mt-1">Transactions</p>
                </div>
              </div>

              {/* Tableau */}
              {filtered.length === 0 ? (
                <p className="text-center text-gray-400 py-8 text-sm">Aucune transaction sur cette période.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-3 text-gray-500 font-semibold">Date</th>
                        <th className="text-left py-2 px-3 text-gray-500 font-semibold">Description</th>
                        <th className="text-left py-2 px-3 text-gray-500 font-semibold">Catégorie</th>
                        <th className="text-left py-2 px-3 text-gray-500 font-semibold">Type</th>
                        <th className="text-right py-2 px-3 text-gray-500 font-semibold">Montant</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((t) => (
                        <tr key={t.id_transaction} className="border-b border-gray-100 hover:bg-gray-50 transition">
                          <td className="py-2 px-3 text-gray-500">{fmt(t.date)}</td>
                          <td className="py-2 px-3 font-medium">{t.description}</td>
                          <td className="py-2 px-3">
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                              {t.category_name}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            <span className={`flex items-center gap-1 w-fit rounded-full px-2 py-0.5 text-xs font-semibold ${t.type === "income" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-500"}`}>
                              {t.type === "income" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {t.type === "income" ? "Revenu" : "Dépense"}
                            </span>
                          </td>
                          <td className={`py-2 px-3 text-right font-bold ${t.type === "income" ? "text-emerald-600" : "text-red-500"}`}>
                            {t.type === "income" ? "+" : "-"}
                            {Number(t.montant).toLocaleString("fr-FR", { minimumFractionDigits: 2 })} €
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </NeumorphicCard>
          </div>
        </main>
      </div>

      {openTransaction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setOpenTransaction(false)}>
          <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <TransactionForm
              onClose={() => setOpenTransaction(false)}
              onSuccess={() => setOpenTransaction(false)}
              projectId={projectId}
            />
          </div>
        </div>
      )}
    </div>
  );
}
