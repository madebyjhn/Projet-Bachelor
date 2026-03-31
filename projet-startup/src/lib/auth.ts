export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type ValidationResult =
  | { ok: true }
  | { ok: false; message: string; status: number };

export function validateLoginInput(
  input: Partial<LoginInput>,
): ValidationResult {
  if (!input.email || !input.password) {
    return { ok: false, message: "Champs manquants", status: 400 };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.email)) {
    return { ok: false, message: "Format e-mail invalide", status: 400 };
  }

  if (input.password.length < 6) {
    return {
      ok: false,
      message: "Mot de passe trop court (min 6 caractères)",
      status: 400,
    };
  }

  return { ok: true };
}

export function validateRegisterInput(
  input: Partial<RegisterInput>,
): ValidationResult {
  if (!input.name || !input.email || !input.password) {
    return { ok: false, message: "Champs manquants", status: 400 };
  }

  if (input.name.trim().length < 2) {
    return {
      ok: false,
      message: "Le nom doit contenir au moins 2 caractères",
      status: 400,
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.email)) {
    return { ok: false, message: "Format e-mail invalide", status: 400 };
  }

  if (input.password.length < 6) {
    return {
      ok: false,
      message: "Mot de passe trop court (min 6 caractères)",
      status: 400,
    };
  }

  return { ok: true };
}

export function formatVerifyLink(baseUrl: string, token: string): string {
  if (!baseUrl || !token) {
    throw new Error("baseUrl et token sont requis");
  }

  const normalizedBase = baseUrl.replace(/\/$/, "");

  const hexRegex = /^[0-9a-f]{64}$/i;
  if (!hexRegex.test(token)) {
    throw new Error(
      "Token invalide : doit être une chaîne hexadécimale de 64 caractères",
    );
  }

  return `${normalizedBase}/api/auth/verify?token=${token}`;
}
