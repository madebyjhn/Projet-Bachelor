import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export default function LegalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white font-sans">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-6 max-w-3xl mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
          <span className="text-sm font-semibold tracking-wide text-white/80">
            StartupLab
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm text-white/50 hover:text-white/90 transition-colors duration-200"
        >
          ← Retour à l&apos;accueil
        </Link>
      </nav>

      <article className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pb-24 pt-6 sm:pt-10">
        {children}
      </article>

      <footer className="relative z-10 text-center pb-10">
        <p className="text-xs text-white/20">
          © 2024 StartupLab — Tous droits réservés
        </p>
      </footer>
    </main>
  );
}
