import type { DeviceCategoryId } from "./brands";
import { getElsewhereRepairPriceBandEuro, formatMarketBandEuro } from "./market-benchmarks";
import { getFallbackRepairs, getModelById, type DeviceModel } from "./models";
import type { PickupModeId } from "./pickupModes";
import { PICKUP_MODE_META } from "./pickupModes";
import { REPAIR_LABELS, type RepairId } from "./repairs";

export function getRepairPricesForModel(modelId: string | null, category: DeviceCategoryId): Partial<Record<RepairId, number>> {
  if (!modelId || modelId === "unknown") {
    return getFallbackRepairs(category);
  }
  const m = getModelById(modelId);
  return m?.repairs ?? getFallbackRepairs(category);
}

export function sumRepairs(
  prices: Partial<Record<RepairId, number>>,
  selected: RepairId[],
): { subtotal: number; lines: { id: RepairId; price: number; label: string }[] } {
  const lines: { id: RepairId; price: number; label: string }[] = [];
  let subtotal = 0;
  for (const id of selected) {
    if (id === "other") continue;
    const p = prices[id];
    if (typeof p === "number" && p > 0) {
      subtotal += p;
      lines.push({ id, price: p, label: REPAIR_LABELS[id].label });
    }
  }
  if (subtotal === 0 && selected.length > 0) {
    subtotal = 29;
    return {
      subtotal,
      lines: [{ id: "other", price: 29, label: "Diagnostic atelier / devis détaillé (estimé)" }],
    };
  }
  if (selected.includes("other")) {
    lines.push({ id: "other", price: 0, label: REPAIR_LABELS.other.label });
  }
  return { subtotal, lines };
}

export function pickupSurcharge(mode: PickupModeId | null): number {
  if (!mode) return 0;
  return PICKUP_MODE_META[mode].priceEuro;
}

export function computeQuoteTotal(input: {
  modelId: string | null;
  category: DeviceCategoryId;
  repairs: RepairId[];
  pickup: PickupModeId | null;
}): {
  lines: { id: RepairId; price: number; label: string }[];
  /** Fourchette « prix ailleurs pour la même réparation » (voir market-benchmarks). */
  marketHints: { id: RepairId; label: string; band: string }[];
  repairsSubtotal: number;
  pickupFee: number;
  total: number;
} {
  const prices = getRepairPricesForModel(input.modelId, input.category);
  const { subtotal, lines } = sumRepairs(prices, input.repairs);
  const pickupFee = pickupSurcharge(input.pickup);

  const marketHints = lines
    .map((l) => {
      const band = getElsewhereRepairPriceBandEuro({
        modelId: input.modelId,
        category: input.category,
        repairId: l.id,
        atelierTTC: l.price,
      });
      if (!band) return null;
      return { id: l.id, label: l.label, band: formatMarketBandEuro(band) };
    })
    .filter((x): x is { id: RepairId; label: string; band: string } => x != null);

  return {
    lines,
    marketHints,
    repairsSubtotal: subtotal,
    pickupFee,
    total: subtotal + pickupFee,
  };
}

export type { DeviceModel };
