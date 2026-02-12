"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isRegister ? "/api/auth/register" : "/api/auth/login";
    const body = isRegister ? { name, email, password } : { email, password };
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log(res.status, data.message);

    if (res.ok && isRegister) {
      sessionStorage.setItem("verifyLink", data.verifyLink);
      router.push("/verify-account");
    } else if (res.ok && !isRegister) {
      router.push("/dashboard");
    } else if (res.status === 403) {
      router.push("/verify-account");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Logo + Title */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg mb-4">
          <span className="text-white text-2xl">↗</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">StartupLab</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Gestion financière intelligente pour startups
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Tabs */}
        <div className="flex justify-between border-b mb-6">
          <button
            onClick={() => setIsRegister(false)}
            className={`pb-2 w-1/2 text-center font-medium transition ${
              !isRegister
                ? "text-violet-600 border-b-2 border-violet-600"
                : "text-gray-400"
            }`}
          >
            Connexion
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`pb-2 w-1/2 text-center font-medium transition ${
              isRegister
                ? "text-violet-600 border-b-2 border-violet-600"
                : "text-gray-400"
            }`}
          >
            Inscription
          </button>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {isRegister ? "Créer un compte" : "Bon retour !"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isRegister
              ? "Inscrivez-vous pour commencer"
              : "Connectez-vous à votre compte"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            {isRegister ? "S'inscrire" : "Se connecter →"}
          </button>
        </form>

        {!isRegister && (
          <p className="text-center text-sm text-gray-500 mt-6">
            Pas encore de compte ?{" "}
            <span
              onClick={() => setIsRegister(true)}
              className="text-violet-600 cursor-pointer hover:underline"
            >
              S&apos;inscrire
            </span>
          </p>
        )}
      </div>

      <p className="text-gray-400 text-xs mt-8">
        © 2024 Startup Finance. Tous droits réservés.
      </p>
    </div>
  );
}
