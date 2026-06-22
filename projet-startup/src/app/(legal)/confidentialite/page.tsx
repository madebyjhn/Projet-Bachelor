import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — StartupLab",
  description:
    "Politique de confidentialité et protection des données personnelles de StartupLab.",
};

export default function ConfidentialitePage() {
  return (
    <>
      <h1 className="text-3xl sm:text-4xl font-bold mb-2">
        Politique de confidentialité
      </h1>
      <p className="text-sm text-white/40 mb-10">Dernière mise à jour : 22 juin 2026</p>

      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        Cette politique décrit quelles données personnelles StartupLab
        collecte, pourquoi, et comment vous pouvez exercer vos droits,
        conformément au Règlement Général sur la Protection des Données
        (RGPD).
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">1. Responsable du traitement</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        Johan Cinosi, dans le cadre du projet StartupLab, est responsable du
        traitement des données décrites ci-dessous. Contact :{" "}
        <a href="mailto:cinosi.johan@gmail.com" className="text-white/70 underline hover:text-white">cinosi.johan@gmail.com</a>.
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">2. Données collectées</h2>
      <ul className="list-disc ml-5 mb-4 space-y-1">
        <li className="text-sm sm:text-base text-white/50 leading-relaxed">
          <span className="text-white/70">Compte :</span> nom complet, adresse email, mot de passe (stocké sous forme hachée, jamais en clair).
        </li>
        <li className="text-sm sm:text-base text-white/50 leading-relaxed">
          <span className="text-white/70">Données financières :</span> projets, transactions et catégories que vous saisissez vous-même dans l&apos;application.
        </li>
        <li className="text-sm sm:text-base text-white/50 leading-relaxed">
          <span className="text-white/70">Journaux d&apos;activité :</span> connexions, créations/modifications/suppressions de transactions et projets, horodatées, à des fins de sécurité et de débogage.
        </li>
        <li className="text-sm sm:text-base text-white/50 leading-relaxed">
          <span className="text-white/70">Mesure d&apos;audience :</span> statistiques d&apos;usage anonymisées et agrégées via Vercel Analytics / Speed Insights (pas de profilage individuel, pas de cookie publicitaire).
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">3. Finalités et base légale</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        Ces données sont utilisées pour créer et sécuriser votre compte,
        afficher vos données financières, assurer la sécurité du service
        (détection d&apos;activités anormales) et améliorer
        l&apos;application. Le traitement repose sur l&apos;exécution du
        service que vous avez demandé en créant un compte (article 6.1.b du
        RGPD) et, pour la sécurité, sur l&apos;intérêt légitime de
        l&apos;éditeur.
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">4. Cookies</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        StartupLab utilise un unique cookie strictement nécessaire (
        <code className="text-white/70">token</code>) contenant un jeton de
        session chiffré, indispensable pour rester connecté. Ce cookie
        n&apos;est pas utilisé à des fins publicitaires et ne nécessite pas
        de consentement préalable. Aucun cookie tiers de tracking
        n&apos;est déposé.
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">5. Hébergement et destinataires</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        Les données sont hébergées chez Vercel Inc. (front-end) et Railway
        Corporation (base de données et API), tous deux situés aux
        États-Unis. Elles ne sont ni vendues, ni partagées avec des tiers à
        des fins commerciales.
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">6. Durée de conservation</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        Les données de compte et financières sont conservées tant que votre
        compte est actif. Les journaux d&apos;activité sont conservés au
        maximum 12 mois à des fins de sécurité, puis supprimés.
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">7. Vos droits</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
        rectification, d&apos;effacement, de limitation et de portabilité de
        vos données. Vous pouvez :
      </p>
      <ul className="list-disc ml-5 mb-4 space-y-1">
        <li className="text-sm sm:text-base text-white/50 leading-relaxed">modifier votre nom et votre email depuis votre profil ;</li>
        <li className="text-sm sm:text-base text-white/50 leading-relaxed">supprimer votre compte et vos données financières à tout moment depuis l&apos;application ;</li>
        <li className="text-sm sm:text-base text-white/50 leading-relaxed">
          demander l&apos;accès, la rectification, l&apos;effacement anticipé
          des journaux d&apos;activité ou la portabilité de vos données en
          écrivant à{" "}
          <a href="mailto:cinosi.johan@gmail.com" className="text-white/70 underline hover:text-white">cinosi.johan@gmail.com</a>.
        </li>
      </ul>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        Vous disposez également du droit d&apos;introduire une réclamation
        auprès de la CNIL (
        <a href="https://www.cnil.fr" target="_blank" rel="noreferrer" className="text-white/70 underline hover:text-white">cnil.fr</a>
        ).
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">8. Sécurité</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        Les mots de passe sont hachés (bcrypt) et les sessions sont
        authentifiées par jeton signé (JWT). Des mesures raisonnables sont
        mises en place pour protéger vos données, sans pouvoir garantir une
        sécurité absolue, notamment dans le cadre d&apos;un projet étudiant.
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">9. Modification de cette politique</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        Cette politique peut être mise à jour ; la version en vigueur est
        celle publiée sur cette page.
      </p>
    </>
  );
}
