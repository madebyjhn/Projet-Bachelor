import { computeStats } from "../finance";

describe("computeStats", () => {
  describe("bénéfice", () => {
    it("calcule un bénéfice positif", () => {
      const { benefice } = computeStats(10000, 6000);
      expect(benefice).toBe(4000);
    });

    it("calcule un bénéfice négatif (perte)", () => {
      const { benefice } = computeStats(3000, 5000);
      expect(benefice).toBe(-2000);
    });

    it("retourne 0 si revenus = dépenses", () => {
      const { benefice } = computeStats(5000, 5000);
      expect(benefice).toBe(0);
    });
  });

  describe("rentabilité", () => {
    it("calcule la rentabilité correctement", () => {
      const { rentabilite } = computeStats(10000, 6000);
      expect(rentabilite).toBeCloseTo(0.4);
    });

    it("retourne une rentabilité négative en cas de perte", () => {
      const { rentabilite } = computeStats(5000, 8000);
      expect(rentabilite).toBeCloseTo(-0.6);
    });

    it("retourne 0 si les revenus sont 0 (évite division par zéro)", () => {
      const { rentabilite } = computeStats(0, 1000);
      expect(rentabilite).toBe(0);
    });

    it("retourne 0 si tout est à 0", () => {
      const { rentabilite } = computeStats(0, 0);
      expect(rentabilite).toBe(0);
    });
  });

  describe("cohérence de l'objet retourné", () => {
    it("retourne bien les revenus et dépenses passés en entrée", () => {
      const stats = computeStats(8000, 3000);
      expect(stats.total_revenus).toBe(8000);
      expect(stats.total_depenses).toBe(3000);
    });

    it("tous les champs sont des nombres finis", () => {
      const stats = computeStats(12000, 7500);
      Object.values(stats).forEach((v) => {
        expect(Number.isFinite(v)).toBe(true);
      });
    });
  });
});
