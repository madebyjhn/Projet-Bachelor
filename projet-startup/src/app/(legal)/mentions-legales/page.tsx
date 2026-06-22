import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales — StartupLab",
  description: "Mentions légales du site StartupLab.",
};

export default function MentionsLegalesPage() {
  return (
    <>
      <h1 className="text-3xl sm:text-4xl font-bold mb-2">Mentions légales</h1>
      <p className="text-sm text-white/40 mb-10">Dernière mise à jour : 22 juin 2026</p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">Éditeur du site</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        StartupLab est un projet personnel développé par Johan Cinosi dans le
        cadre d&apos;un travail de Bachelor. Il s&apos;agit d&apos;un projet à
        vocation pédagogique et démonstrative, sans personnalité morale ni
        numéro SIRET.
      </p>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        Responsable de la publication : Johan Cinosi
        <br />
        Contact : <a href="mailto:cinosi.johan@gmail.com" className="text-white/70 underline hover:text-white">cinosi.johan@gmail.com</a>
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">Hébergement</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-2">
        Hébergement du site (front-end) :
        <br />
        Vercel Inc. — 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
        <br />
        <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-white/70 underline hover:text-white">vercel.com</a>
      </p>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        Hébergement de l&apos;application et des données (back-end / API) :
        <br />
        Railway Corporation — San Francisco, CA, États-Unis
        <br />
        <a href="https://railway.app" target="_blank" rel="noreferrer" className="text-white/70 underline hover:text-white">railway.app</a>
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">Propriété intellectuelle</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        L&apos;ensemble du contenu de ce site (textes, code source, visuels,
        logo) est la propriété de l&apos;éditeur, sauf mention contraire, et
        ne peut être reproduit sans autorisation préalable.
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">Contact</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        Pour toute question relative au site, vous pouvez écrire à{" "}
        <a href="mailto:cinosi.johan@gmail.com" className="text-white/70 underline hover:text-white">cinosi.johan@gmail.com</a>.
      </p>
    </>
  );
}
