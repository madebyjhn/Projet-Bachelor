import {
  validateLoginInput,
  validateRegisterInput,
  formatVerifyLink,
} from "../auth";

describe("validateLoginInput", () => {
  describe("champs manquants", () => {
    it("renvoie une erreur si email et password sont absents", () => {
      const result = validateLoginInput({});
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.status).toBe(400);
        expect(result.message).toBe("Champs manquants");
      }
    });

    it("renvoie une erreur si l'email est absent", () => {
      const result = validateLoginInput({ password: "secret123" });
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.message).toBe("Champs manquants");
    });

    it("renvoie une erreur si le password est absent", () => {
      const result = validateLoginInput({ email: "user@test.com" });
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.message).toBe("Champs manquants");
    });

    it("renvoie une erreur si les champs sont des chaînes vides", () => {
      const result = validateLoginInput({ email: "", password: "" });
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.message).toBe("Champs manquants");
    });
  });

  describe("format e-mail", () => {
    it("renvoie une erreur pour un e-mail sans @", () => {
      const result = validateLoginInput({
        email: "invalid-email",
        password: "secret123",
      });
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.message).toBe("Format e-mail invalide");
    });

    it("renvoie une erreur pour un e-mail sans domaine", () => {
      const result = validateLoginInput({
        email: "user@",
        password: "secret123",
      });
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.message).toBe("Format e-mail invalide");
    });

    it("accepte un e-mail valide", () => {
      const result = validateLoginInput({
        email: "user@example.com",
        password: "secret123",
      });
      expect(result.ok).toBe(true);
    });
  });

  describe("longueur du mot de passe", () => {
    it("renvoie une erreur si le mot de passe est trop court (< 6 chars)", () => {
      const result = validateLoginInput({
        email: "user@example.com",
        password: "abc",
      });
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.status).toBe(400);
        expect(result.message).toMatch(/trop court/i);
      }
    });

    it("accepte un mot de passe d'exactement 6 caractères", () => {
      const result = validateLoginInput({
        email: "user@example.com",
        password: "abcdef",
      });
      expect(result.ok).toBe(true);
    });
  });

  describe("cas valides", () => {
    it("renvoie { ok: true } pour des données correctes", () => {
      const result = validateLoginInput({
        email: "john.doe@startup.io",
        password: "P@ssw0rd!",
      });
      expect(result.ok).toBe(true);
    });
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// validateRegisterInput (subscribe)
// ─────────────────────────────────────────────────────────────────────────────

describe("validateRegisterInput", () => {
  const validInput = {
    name: "Alice Martin",
    email: "alice@startup.io",
    password: "securePass1",
  };

  describe("champs manquants", () => {
    it("renvoie une erreur si tous les champs sont absents", () => {
      const result = validateRegisterInput({});
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.status).toBe(400);
        expect(result.message).toBe("Champs manquants");
      }
    });

    it("renvoie une erreur si le nom est absent", () => {
      const { name, ...rest } = validInput;
      const result = validateRegisterInput(rest);
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.message).toBe("Champs manquants");
    });

    it("renvoie une erreur si l'e-mail est absent", () => {
      const { email, ...rest } = validInput;
      const result = validateRegisterInput(rest);
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.message).toBe("Champs manquants");
    });

    it("renvoie une erreur si le mot de passe est absent", () => {
      const { password, ...rest } = validInput;
      const result = validateRegisterInput(rest);
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.message).toBe("Champs manquants");
    });
  });

  describe("validation du nom", () => {
    it("renvoie une erreur pour un nom d'un seul caractère", () => {
      const result = validateRegisterInput({ ...validInput, name: "A" });
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.message).toMatch(/2 caractères/);
    });

    it("renvoie une erreur pour un nom composé d'espaces", () => {
      const result = validateRegisterInput({ ...validInput, name: "  " });
      expect(result.ok).toBe(false);
    });

    it("accepte un nom d'exactement 2 caractères", () => {
      const result = validateRegisterInput({ ...validInput, name: "Al" });
      expect(result.ok).toBe(true);
    });
  });

  describe("validation de l'e-mail", () => {
    it("renvoie une erreur pour un e-mail mal formé", () => {
      const result = validateRegisterInput({ ...validInput, email: "noemail" });
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.message).toBe("Format e-mail invalide");
    });

    it("renvoie une erreur pour un e-mail sans TLD", () => {
      const result = validateRegisterInput({
        ...validInput,
        email: "user@domain",
      });
      expect(result.ok).toBe(false);
    });

    it("accepte un e-mail avec sous-domaine", () => {
      const result = validateRegisterInput({
        ...validInput,
        email: "user@mail.startup.io",
      });
      expect(result.ok).toBe(true);
    });
  });

  describe("validation du mot de passe", () => {
    it("renvoie une erreur pour un mot de passe de 5 caractères", () => {
      const result = validateRegisterInput({
        ...validInput,
        password: "12345",
      });
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.message).toMatch(/trop court/i);
    });

    it("accepte un mot de passe de 6 caractères exactement", () => {
      const result = validateRegisterInput({
        ...validInput,
        password: "123456",
      });
      expect(result.ok).toBe(true);
    });

    it("accepte un mot de passe long avec caractères spéciaux", () => {
      const result = validateRegisterInput({
        ...validInput,
        password: "Sup3r$ecureP@ssword!",
      });
      expect(result.ok).toBe(true);
    });
  });

  describe("cas valides", () => {
    it("renvoie { ok: true } pour des données complètes et correctes", () => {
      const result = validateRegisterInput(validInput);
      expect(result.ok).toBe(true);
    });
  });
});

const VALID_TOKEN = "a".repeat(64); // 64 chars hex valide

describe("formatVerifyLink", () => {
  describe("construction du lien", () => {
    it("génère un lien correct avec une URL de base standard", () => {
      const link = formatVerifyLink("http://localhost:3000", VALID_TOKEN);
      expect(link).toBe(
        `http://localhost:3000/api/auth/verify?token=${VALID_TOKEN}`,
      );
    });

    it("supprime le slash final de l'URL de base", () => {
      const link = formatVerifyLink("http://localhost:3000/", VALID_TOKEN);
      expect(link).toBe(
        `http://localhost:3000/api/auth/verify?token=${VALID_TOKEN}`,
      );
    });

    it("fonctionne avec une URL de production HTTPS", () => {
      const link = formatVerifyLink("https://app.startuplab.io", VALID_TOKEN);
      expect(link).toContain("https://app.startuplab.io/api/auth/verify");
      expect(link).toContain(`token=${VALID_TOKEN}`);
    });

    it("contient exactement le token passé en paramètre", () => {
      const token = "f".repeat(64);
      const link = formatVerifyLink("http://localhost:3000", token);
      expect(link).toContain(token);
    });
  });

  describe("validation des paramètres", () => {
    it("lève une erreur si baseUrl est vide", () => {
      expect(() => formatVerifyLink("", VALID_TOKEN)).toThrow(
        "baseUrl et token sont requis",
      );
    });

    it("lève une erreur si token est vide", () => {
      expect(() => formatVerifyLink("http://localhost:3000", "")).toThrow(
        "baseUrl et token sont requis",
      );
    });

    it("lève une erreur si le token est trop court", () => {
      expect(() => formatVerifyLink("http://localhost:3000", "abc123")).toThrow(
        "Token invalide",
      );
    });

    it("lève une erreur si le token contient des caractères non hexadécimaux", () => {
      const badToken = "z".repeat(64); // 'z' n'est pas hex
      expect(() => formatVerifyLink("http://localhost:3000", badToken)).toThrow(
        "Token invalide",
      );
    });

    it("accepte un token hexadécimal en majuscules", () => {
      const upperToken = "A".repeat(64);
      expect(() =>
        formatVerifyLink("http://localhost:3000", upperToken),
      ).not.toThrow();
    });
  });

  describe("format de la valeur retournée", () => {
    it("retourne une chaîne de caractères", () => {
      const link = formatVerifyLink("http://localhost:3000", VALID_TOKEN);
      expect(typeof link).toBe("string");
    });

    it("le lien contient le chemin /api/auth/verify", () => {
      const link = formatVerifyLink("http://localhost:3000", VALID_TOKEN);
      expect(link).toContain("/api/auth/verify");
    });

    it("le lien contient le paramètre ?token=", () => {
      const link = formatVerifyLink("http://localhost:3000", VALID_TOKEN);
      expect(link).toContain("?token=");
    });
  });
});
