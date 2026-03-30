import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white font-sans">
      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "900px",
          height: "600px",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,.22) 0%, transparent 70%)",
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="lg-fill"
                x1="0"
                y1="0"
                x2="34"
                y2="34"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#4338ca" />
              </linearGradient>
              <linearGradient
                id="lg-arrow"
                x1="8"
                y1="22"
                x2="26"
                y2="8"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#f0abfc" />
              </linearGradient>
            </defs>
            {/* Fond carré arrondi */}
            <rect width="34" height="34" rx="10" fill="url(#lg-fill)" />
            {/* Barre du bas — ligne de base */}
            <line
              x1="8"
              y1="24"
              x2="26"
              y2="24"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeOpacity="0.25"
            />
            {/* Trois colonnes de hauteur croissante */}
            <rect
              x="8"
              y="19"
              width="4"
              height="5"
              rx="1.5"
              fill="white"
              fillOpacity="0.3"
            />
            <rect
              x="15"
              y="14"
              width="4"
              height="10"
              rx="1.5"
              fill="white"
              fillOpacity="0.5"
            />
            <rect
              x="22"
              y="10"
              width="4"
              height="14"
              rx="1.5"
              fill="white"
              fillOpacity="0.9"
            />
            {/* Flèche de tendance diagonale */}
            <path
              d="M9 21 L15 15.5 L21 18 L26 10.5"
              stroke="url(#lg-arrow)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Dot à la pointe de la flèche */}
            <circle cx="26" cy="10.5" r="1.8" fill="#f0abfc" />
          </svg>
          <span className="text-sm font-semibold tracking-wide text-white/80">
            StartupLab
          </span>
        </div>
        <Link
          href="/auth"
          className="text-sm text-white/50 hover:text-white/90 transition-colors duration-200"
        >
          Se connecter →
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-32 max-w-4xl mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-10"
          style={{
            background: "rgba(139,92,246,.12)",
            border: "1px solid rgba(139,92,246,.3)",
            color: "#c4b5fd",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#a78bfa", boxShadow: "0 0 6px #a78bfa" }}
          />
          Gestion financière pour startups
        </div>

        {/* Headline */}
        <h1
          className="text-6xl font-bold leading-[1.08] tracking-tight mb-6"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          Pilotez votre{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #c084fc 0%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            trésorerie
          </span>
          <br />
          sans friction
        </h1>

        <p className="text-lg text-white/45 max-w-xl leading-relaxed mb-12">
          Suivez revenus, dépenses et rentabilité en temps réel. Conçu pour les
          équipes qui veulent des chiffres clairs, pas des tableaux
          incompréhensibles.
        </p>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="/auth"
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
              boxShadow:
                "0 0 0 1px rgba(139,92,246,.5), 0 8px 24px rgba(99,102,241,.3)",
            }}
          >
            Commencer gratuitement
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="group-hover:translate-x-0.5 transition-transform"
            >
              <path
                d="M2 7h10M8 3l4 4-4 4"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href="/auth"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium text-white/60 hover:text-white/90 transition-colors duration-200"
            style={{ border: "1px solid rgba(255,255,255,.1)" }}
          >
            Se connecter
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect
                    x="1"
                    y="1"
                    width="16"
                    height="16"
                    rx="4"
                    stroke="#34d399"
                    strokeWidth="1.4"
                  />
                  <polyline
                    points="4,11 7,7.5 10,9.5 14,5"
                    stroke="#34d399"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
              color: "#34d399",
              colorBg: "rgba(52,211,153,.08)",
              colorBorder: "rgba(52,211,153,.2)",
              title: "Suivi en temps réel",
              desc: "Revenus et dépenses mis à jour à chaque transaction. Solde toujours visible.",
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle
                    cx="9"
                    cy="9"
                    r="7.5"
                    stroke="#818cf8"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M9 4v5l3 2"
                    stroke="#818cf8"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              ),
              color: "#818cf8",
              colorBg: "rgba(129,140,248,.08)",
              colorBorder: "rgba(129,140,248,.2)",
              title: "Cashflow projeté",
              desc: "Visualisez votre trésorerie sur les prochains mois. Anticipez avant d'agir.",
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M9 1L1 5v8l8 4 8-4V5L9 1z"
                    stroke="#f472b6"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 1v16M1 5l8 4 8-4"
                    stroke="#f472b6"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                </svg>
              ),
              color: "#f472b6",
              colorBg: "rgba(244,114,182,.08)",
              colorBorder: "rgba(244,114,182,.2)",
              title: "Catégories auto",
              desc: "Classez vos transactions par catégorie. Répartition instantanée en un coup d'œil.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.07)",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  background: f.colorBg,
                  border: `1px solid ${f.colorBorder}`,
                }}
              >
                {f.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-white/90 mb-1">
                  {f.title}
                </p>
                <p className="text-sm text-white/40 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-center pb-10">
        <p className="text-xs text-white/20">
          © 2024 StartupLab — Tous droits réservés
        </p>
      </footer>

      {/* Sora font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@700&display=swap');`}</style>
    </main>
  );
}
