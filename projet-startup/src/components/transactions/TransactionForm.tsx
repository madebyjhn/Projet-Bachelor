"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type Stats = {
  total_revenus: number;
  total_depenses: number;
  benefice: number;
  rentabilite: number;
};

type Transaction = {
  id_transaction: number;
  description: string;
  type: "income" | "expense";
  date: string;
  montant: number;
  category_name: string;
};

export default function TransactionForm({
  onClose,
  onSuccess,
  projectId,
  transaction,
}: {
  onClose: () => void;
  onSuccess: (stats: Stats, transaction?: Transaction) => void;
  projectId: number;
  transaction?: Transaction;
}) {
  const [description, setDescription] = useState(
    transaction?.description ?? "",
  );
  const [type, setType] = useState<"income" | "expense" | "">(
    transaction?.type ?? "",
  );
  const [date, setDate] = useState(transaction?.date ?? "");
  const [montant, setMontant] = useState(transaction?.montant ?? 0);
  const [category_name, setCategory_name] = useState(
    transaction?.category_name ?? "",
  );
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const method = transaction ? "PUT" : "POST";
    const url = transaction
      ? `/api/transaction?id_transaction=${transaction.id_transaction}`
      : "/api/transaction";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        type,
        date,
        montant,
        category_name,
        id_project: projectId,
      }),
    });

    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          type,
          date,
          montant,
          category_name,
          id_project: projectId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erreur lors de la création.");
        return;
      }

      onSuccess(data.stats, data.transaction);
    } catch {
      setError("Erreur réseau. Réessaie.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 rounded-2xl p-6 shadow-[8px_8px_16px_#b8b8b8,-8px_-8px_16px_#ffffff]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {transaction ? "Modifier la transaction" : "Nouvelle transaction"}
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Plus className="w-5 h-5 text-gray-600 rotate-45" />
        </button>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Montant <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={montant}
              onChange={(e) => setMontant(Number(e.target.value))}
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#b8b8b8,inset_-6px_-6px_12px_#ffffff] transition-shadow text-gray-700"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value as "income" | "expense" | "")
              }
              className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#b8b8b8,inset_-6px_-6px_12px_#ffffff] transition-shadow text-gray-700"
            >
              <option value="">Choisir</option>
              <option value="income">Revenu</option>
              <option value="expense">Dépense</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#b8b8b8,inset_-6px_-6px_12px_#ffffff] transition-shadow text-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Catégorie <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={category_name}
            onChange={(e) => setCategory_name(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#b8b8b8,inset_-6px_-6px_12px_#ffffff] transition-shadow text-gray-700"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#b8b8b8,inset_-6px_-6px_12px_#ffffff] transition-shadow text-gray-700"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-medium py-3 px-6 transition-all duration-300 hover:from-violet-600 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "En cours..." : transaction ? "Modifier" : "Ajouter"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-100 text-gray-700 rounded-xl font-medium py-3 px-6 shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] hover:bg-gray-200 transition-all duration-300"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
