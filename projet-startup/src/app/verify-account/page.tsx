"use client";

import { useEffect, useState } from "react";

export default function Verifyaccount() {
  const [verifyLink, setVerifyLink] = useState<string>("");

  useEffect(() => {
    setVerifyLink(sessionStorage.getItem("verifyLink") || "");
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      {/* Logo + Title */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg mb-4">
          <span className="text-white text-2xl">↗</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Startup Finance</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Gestion financière intelligente pour startups
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Oups, votre compte n&apos;est pas activé !
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Merci d&apos;activer le compte via le lien transféré par mail.
          </p>
        </div>

        {verifyLink ? (
          <div className="mt-6 p-4 rounded-xl bg-gray-100 text-sm break-all">
            <p className="font-semibold text-gray-700 mb-2">
              Lien de vérification (DEV) :
            </p>
            <a href={verifyLink} className="text-violet-600 hover:underline">
              {verifyLink}
            </a>
          </div>
        ) : (
          <div className="mt-6 p-4 rounded-xl bg-gray-100 text-sm text-gray-500">
            Aucun lien de vérification trouvé.
          </div>
        )}

        <div className="mt-6 text-center">
          <a
            href="/auth"
            className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            Retour à la connexion →
          </a>
        </div>
      </div>

      <p className="text-gray-400 text-xs mt-8">
        © 2024 Startup Finance. Tous droits réservés.
      </p>
    </div>
  );
}
