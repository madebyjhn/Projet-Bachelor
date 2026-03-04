"use client";

import * as React from "react";
import {
  Rocket,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BarChart3,
  PieChart,
  Wallet,
} from "lucide-react";

type Props = {
  hasProjects: boolean;
  userName: string;
  projectName?: string;
};

export default function DashboardClient({ hasProjects, userName }: Props) {
  const [step, setStep] = React.useState(1);
  const [nomProjet, setNomProjet] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const isValid = () =>
    nomProjet.trim().length >= 2 && description.trim().length >= 10;

  const next = () => {
    setError(null);

    if (step === 2 && !isValid()) {
      setError("Nom min 2 caractères + description min 10 caractères.");
      return;
    }

    setStep((s) => Math.min(3, s + 1));
  };

  const back = () => {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  };

  const createProject = async () => {
    setError(null);

    if (!isValid()) {
      setError("Formulaire invalide. Vérifie le nom et la description.");
      setStep(2);
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom_projet: nomProjet.trim(),
          description: description.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur création projet.");
        return;
      }

      window.location.href = "/dashboard";
    } catch {
      setError("Erreur réseau. Réessaie.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!hasProjects) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gradient-to-b from-zinc-50 via-white to-zinc-100 px-4">
        <div className="w-full max-w-xl">
          <div
            className="
      rounded-3xl bg-white/70 p-10 backdrop-blur
      border border-white/70 ring-1 ring-black/5
      shadow-[0_24px_60px_rgba(15,23,42,0.14),0_-10px_30px_rgba(255,255,255,0.8),inset_0_1px_0_rgba(255,255,255,0.9)]
      text-center
    "
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 shadow-lg shadow-violet-200">
              <Rocket className="h-7 w-7 text-white" />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-zinc-900">
              Bienvenue {userName} 🚀
            </h1>

            <p className="mt-2 text-zinc-600">
              Créons votre premier projet financier
            </p>

            {/* Stepper (tabs + slider) */}
            <div className="mt-8">
              <div className="relative grid grid-cols-3 gap-0 border-b border-zinc-200">
                <div
                  className={[
                    "absolute bottom-0 left-0 h-0.5 w-1/3 bg-gradient-to-r from-violet-600 to-purple-600 transition-transform duration-300",
                    step === 1
                      ? "translate-x-0"
                      : step === 2
                        ? "translate-x-full"
                        : "translate-x-[200%]",
                  ].join(" ")}
                />

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={[
                    "py-3 text-center text-sm font-semibold transition-colors",
                    step === 1
                      ? "text-violet-600"
                      : "text-zinc-500 hover:text-zinc-700",
                  ].join(" ")}
                >
                  Étape 1
                </button>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={[
                    "py-3 text-center text-sm font-semibold transition-colors",
                    step === 2
                      ? "text-violet-600"
                      : "text-zinc-500 hover:text-zinc-700",
                  ].join(" ")}
                >
                  Étape 2
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className={[
                    "py-3 text-center text-sm font-semibold transition-colors",
                    step === 3
                      ? "text-violet-600"
                      : "text-zinc-500 hover:text-zinc-700",
                  ].join(" ")}
                >
                  Étape 3
                </button>
              </div>

              <p className="mt-2 text-xs text-zinc-500">Étape {step} sur 3</p>
            </div>

            {step === 1 && (
              <div className="mt-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                    <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 ring-1 ring-emerald-100">
                      <Wallet className="h-5 w-5 text-emerald-600" />
                    </div>
                    <p className="text-sm font-semibold text-zinc-900">Suivi</p>
                    <p className="mt-1 text-xs text-zinc-600">
                      Revenus, dépenses, solde.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-violet-50 p-4 ring-1 ring-violet-100">
                    <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 ring-1 ring-violet-100">
                      <BarChart3 className="h-5 w-5 text-violet-600" />
                    </div>
                    <p className="text-sm font-semibold text-zinc-900">
                      Cashflow
                    </p>
                    <p className="mt-1 text-xs text-zinc-600">
                      Vision claire dans le temps.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-sky-50 p-4 ring-1 ring-sky-100">
                    <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/70 ring-1 ring-sky-100">
                      <PieChart className="h-5 w-5 text-sky-600" />
                    </div>
                    <p className="text-sm font-semibold text-zinc-900">
                      Catégories
                    </p>
                    <p className="mt-1 text-xs text-zinc-600">
                      Répartition instantanée.
                    </p>
                  </div>
                </div>

                <button
                  onClick={next}
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-200"
                >
                  <Sparkles className="h-4 w-4" />
                  Commencer
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="mt-6 flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Nom du projet"
                  value={nomProjet}
                  onChange={(e) => setNomProjet(e.target.value)}
                  className="border rounded px-3 py-2"
                />

                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border rounded px-3 py-2"
                />

                {error && <p className="text-red-500">{error}</p>}

                <div className="mt-2 flex gap-3 justify-center">
                  <button
                    type="button"
                    onClick={back}
                    className="inline-flex items-center gap-2 rounded-xl bg-white/70 px-4 py-2 text-sm font-semibold text-zinc-700 ring-1 ring-zinc-200 transition hover:bg-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Retour
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
                  >
                    Suivant
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mt-6">
                <button
                  type="button"
                  onClick={createProject}
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                      Création...
                    </>
                  ) : (
                    <>
                      Créer le projet
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[60vh] items-center justify-center">
      <h1 className="text-3xl font-bold">Bienvenue {userName} 👋</h1>
    </div>
  );
}
