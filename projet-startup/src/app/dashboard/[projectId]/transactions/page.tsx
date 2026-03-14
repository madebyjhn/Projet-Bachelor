"use client";

import { useState } from "react";
import { NeumorphicCard } from "../../../../components/ui/NeumorphicCard";
import { Plus } from "lucide-react";

export default function TransactionForm({
  onClose,
  projectId,
}: {
  onClose: () => void;
  projectId: number;
}) {
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [montant, setMontant] = useState(0);
  const [category_name, setCategory_name] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormEvent>) => {
    e.preventDefault();

    const transaction = {
      description,
      type,
      date,
      montant,
      category_name,
      id_project: projectId,
    };

    const res = await fetch("/api/transaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });

    const data = await res.json();
    console.log(res.status, data.message);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-100 rounded-2xl p-6 shadow-[8px_8px_16px_#b8b8b8,-8px_-8px_16px_#ffffff] transition-all duration-300 ease-out">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Nouvelle transaction
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-5 h-5 text-gray-600 transform rotate-45" />
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Montant <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={montant}
                  onChange={(e) => setMontant(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#b8b8b8,inset_-6px_-6px_12px_#ffffff] transition-shadow duration-150 ease-out text-gray-700 placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#b8b8b8,inset_-6px_-6px_12px_#ffffff] transition-shadow duration-150 ease-out text-gray-700"
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
                className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#b8b8b8,inset_-6px_-6px_12px_#ffffff] transition-shadow duration-150 ease-out text-gray-700 placeholder-gray-400"
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
                className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#b8b8b8,inset_-6px_-6px_12px_#ffffff] transition-shadow duration-150 ease-out text-gray-700 placeholder-gray-400"
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
                className="w-full px-4 py-3 bg-gray-100 rounded-xl border-none outline-none shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] focus:shadow-[inset_6px_6px_12px_#b8b8b8,inset_-6px_-6px_12px_#ffffff] transition-shadow duration-150 ease-out text-gray-700 placeholder-gray-400"
              />
            </div>
            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-medium py-3 px-6 transition-all duration-300 ease-out active:scale-95 hover:shadow-lg transform hover:-translate-y-0.5 shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] hover:shadow-[6px_6px_12px_#b8b8b8,-6px_-6px_12px_#ffffff] hover:from-violet-600 hover:to-purple-700"
              >
                Ajouter
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-100 text-gray-700 rounded-xl font-medium py-3 px-6 transition-all duration-300 ease-out active:scale-95 hover:shadow-lg transform hover:-translate-y-0.5 shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] hover:shadow-[6px_6px_12px_#b8b8b8,-6px_-6px_12px_#ffffff] hover:bg-gray-200 hover:text-gray-800"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
