import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation — StartupLab",
  description: "Conditions générales d'utilisation du service StartupLab.",
};

export default function CguPage() {
  return (
    <>
      <h1 className="text-3xl sm:text-4xl font-bold mb-2">
        Conditions générales d&apos;utilisation
      </h1>
      <p className="text-sm text-white/40 mb-10">Dernière mise à jour : 22 juin 2026</p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">1. Objet</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        Les présentes conditions générales d&apos;utilisation (« CGU »)
        régissent l&apos;accès et l&apos;utilisation de StartupLab, une
        application de suivi de trésorerie (revenus, dépenses, projets)
        développée dans le cadre d&apos;un projet de Bachelor. En créant un
        compte ou en utilisant le service, vous acceptez les présentes CGU
        sans réserve.
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">2. Nature du service</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        StartupLab est un projet étudiant à but pédagogique et démonstratif.
        Il ne constitue ni un service financier réglementé, ni un conseil en
        gestion, comptabilité ou investissement. Les chiffres, totaux et
        projections affichés sont calculés à partir des données saisies par
        l&apos;utilisateur et n&apos;ont aucune valeur comptable ou légale.
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">3. Création de compte</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        L&apos;accès aux fonctionnalités nécessite la création d&apos;un
        compte (nom, adresse email, mot de passe) puis la vérification de
        l&apos;adresse email. Vous vous engagez à fournir des informations
        exactes et à conserver la confidentialité de vos identifiants. Vous
        êtes responsable de toute activité effectuée depuis votre compte.
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">4. Usage autorisé</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        Vous vous engagez à utiliser StartupLab de manière loyale et à ne pas
        :
      </p>
      <ul className="list-disc ml-5 mb-4 space-y-1">
        <li className="text-sm sm:text-base text-white/50 leading-relaxed">tenter d&apos;accéder aux comptes ou données d&apos;autres utilisateurs ;</li>
        <li className="text-sm sm:text-base text-white/50 leading-relaxed">perturber le fonctionnement du service (saturation, intrusion, etc.) ;</li>
        <li className="text-sm sm:text-base text-white/50 leading-relaxed">utiliser le service à des fins illégales ou frauduleuses.</li>
      </ul>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">5. Disponibilité du service</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        StartupLab étant un projet académique, aucune garantie de
        disponibilité, de continuité ou de performance n&apos;est apportée.
        Le service peut être interrompu, modifié ou arrêté à tout moment,
        notamment à l&apos;issue du projet de Bachelor.
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">6. Responsabilité</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        L&apos;éditeur ne saurait être tenu responsable des décisions prises
        par l&apos;utilisateur sur la base des données affichées dans
        l&apos;application, ni des pertes de données résultant d&apos;un
        incident technique. Il est recommandé de ne pas utiliser ce service
        comme unique outil de gestion financière d&apos;une activité réelle.
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">7. Suppression du compte</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        Vous pouvez supprimer votre compte à tout moment depuis
        l&apos;application. Cette action entraîne la suppression immédiate et
        définitive de votre compte ainsi que de vos projets, transactions et
        catégories. Voir la{" "}
        <a href="/confidentialite" className="text-white/70 underline hover:text-white">
          politique de confidentialité
        </a>{" "}
        pour le détail des données conservées.
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">8. Modification des CGU</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        Les présentes CGU peuvent être modifiées à tout moment. La version en
        vigueur est celle publiée sur cette page.
      </p>

      <h2 className="text-xl font-semibold text-white/90 mt-10 mb-3">9. Droit applicable</h2>
      <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-4">
        Les présentes CGU sont soumises au droit français. Pour toute
        question, contactez{" "}
        <a href="mailto:cinosi.johan@gmail.com" className="text-white/70 underline hover:text-white">cinosi.johan@gmail.com</a>.
      </p>
    </>
  );
}
