import type { DeviceCategoryId } from "./brands";
import type { RepairId } from "./repairs";

/**
 * Fourchettes « prix constaté ailleurs pour la même réparation » — données **internes** (saisie / relevé).
 *
 * - Ne pas confondre avec une intégration ou un import automatisé depuis un site tiers : à alimenter
 *   par **vos** sources autorisées (devis concurrents agrégés manuellement, partenariat, etc.).
 * - `EXPLICIT_MARKET_BANDS_EUR` : valeurs que vous maintenez ; le fallback est un ordre de grandeur
 *   uniquement si la grille explicite ne couvre pas le modèle.
 */
export const MARKET_COMPARABLE_DISCLAIMER =
  "Fourchette indicative : prix constatés ailleurs pour la même intervention — non contractuelle, basée sur nos relevés internes ou une estimation de secours.";

/** Multiplicateurs min/max sur le prix atelier TTC quand aucune entrée explicite n’existe. */
const FALLBACK_BAND: Record<
  RepairId,
  { minMul: number; maxMul: number }
> = {
  screen: { minMul: 0.42, maxMul: 0.92 },
  battery: { minMul: 0.22, maxMul: 0.48 },
  camera: { minMul: 0.28, maxMul: 0.55 },
  chargePort: { minMul: 0.25, maxMul: 0.52 },
  speaker: { minMul: 0.26, maxMul: 0.5 },
  desox: { minMul: 0.35, maxMul: 0.75 },
  software: { minMul: 0.15, maxMul: 0.4 },
  unlock: { minMul: 0.2, maxMul: 0.45 },
  other: { minMul: 0.2, maxMul: 0.55 },
};

/** Ajustement léger par catégorie d’appareil (écran portable vs fixe). */
const CATEGORY_TWEAK: Partial<Record<DeviceCategoryId, { min: number; max: number }>> = {
  tablet: { min: 0.97, max: 1.05 },
  computer: { min: 0.95, max: 1.08 },
  smartphone: { min: 1, max: 1 },
};

/**
 * Grille : clé = modelId (ex. apple-iphone-14), puis repairId → fourchette € « ailleurs pour la même réparation ».
 */
export const EXPLICIT_MARKET_BANDS_EUR: Record<string, Partial<Record<RepairId, { min: number; max: number }>>> = {
  "apple-iphone-13": {
    screen: { min: 240, max: 380 },
    battery: { min: 28, max: 55 },
    camera: { min: 55, max: 95 },
    chargePort: { min: 35, max: 70 },
  },
  "apple-iphone-14": {
    screen: { min: 260, max: 410 },
    battery: { min: 30, max: 58 },
    camera: { min: 58, max: 98 },
    chargePort: { min: 38, max: 72 },
  },
  "apple-iphone-15": {
    screen: { min: 320, max: 480 },
    battery: { min: 35, max: 62 },
    camera: { min: 65, max: 105 },
    chargePort: { min: 42, max: 78 },
  },
  "apple-iphone-15-pro": {
    screen: { min: 380, max: 560 },
    battery: { min: 40, max: 72 },
    camera: { min: 75, max: 120 },
    chargePort: { min: 48, max: 88 },
  },
  "samsung-galaxy-s23": {
    screen: { min: 200, max: 340 },
    battery: { min: 32, max: 58 },
    camera: { min: 55, max: 90 },
    chargePort: { min: 38, max: 68 },
  },
};

export function getElsewhereRepairPriceBandEuro(input: {
  modelId: string | null;
  category: DeviceCategoryId;
  repairId: RepairId;
  atelierTTC: number;
}): { min: number; max: number } | null {
  if (input.atelierTTC <= 0 || input.repairId === "other") return null;

  const explicit =
    input.modelId && input.modelId !== "unknown" ? EXPLICIT_MARKET_BANDS_EUR[input.modelId]?.[input.repairId] : undefined;
  if (explicit) return { min: explicit.min, max: explicit.max };

  const mul = FALLBACK_BAND[input.repairId] ?? FALLBACK_BAND.other;
  const tw = CATEGORY_TWEAK[input.category] ?? { min: 1, max: 1 };
  const min = Math.max(9, Math.round(input.atelierTTC * mul.minMul * tw.min));
  const max = Math.max(min + 5, Math.round(input.atelierTTC * mul.maxMul * tw.max));
  return { min, max };
}

export function formatMarketBandEuro(b: { min: number; max: number }): string {
  return `${b.min}–${b.max} €`;
}
