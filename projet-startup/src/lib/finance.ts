export type FinancialStats = {
  total_revenus: number;
  total_depenses: number;
  benefice: number;
  rentabilite: number;
};

export function computeStats(
  revenus: number,
  depenses: number,
): FinancialStats {
  const benefice = revenus - depenses;
  const rentabilite = revenus > 0 ? benefice / revenus : 0;

  return {
    total_revenus: revenus,
    total_depenses: depenses,
    benefice,
    rentabilite,
  };
}
