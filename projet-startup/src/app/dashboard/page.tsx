"use client";

import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/auth");
  };

  return (
    <div>
      <h1>Connecté</h1>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
}
