import type { DeviceCategoryId } from "./brands";
import type { RepairId } from "./repairs";

const BASE_SMARTPHONE: Partial<Record<RepairId, number>> = {
  screen: 129,
  battery: 49,
  camera: 79,
  chargePort: 59,
  speaker: 55,
  desox: 79,
  software: 39,
  unlock: 49,
  housing: 79,
  network: 69,
};

/** Grille indicative quand le modèle n’est pas en base — alignée sur les tarifs moyens catégorie. */
export const REPAIR_FALLBACK_BY_CATEGORY: Record<DeviceCategoryId, Partial<Record<RepairId, number>>> = {
  smartphone: { ...BASE_SMARTPHONE },
  tablet: {
    screen: 189,
    battery: 79,
    chargePort: 69,
    speaker: 59,
    desox: 89,
    software: 45,
    unlock: 55,
    housing: 95,
    network: 75,
  },
  computer: {
    screen: 399,
    battery: 129,
    chargePort: 89,
    speaker: 79,
    desox: 129,
    software: 59,
    unlock: 69,
    housing: 149,
    network: 89,
  },
  console: {
    screen: 149,
    battery: 55,
    camera: 0,
    chargePort: 59,
    speaker: 55,
    desox: 89,
    software: 45,
    unlock: 0,
    housing: 69,
    network: 55,
    other: 69,
  },
  other: {
    screen: 89,
    battery: 45,
    chargePort: 45,
    speaker: 45,
    desox: 65,
    software: 35,
    housing: 55,
    network: 55,
    other: 55,
  },
};

export function getFallbackRepairs(category: DeviceCategoryId): Partial<Record<RepairId, number>> {
  return { ...(REPAIR_FALLBACK_BY_CATEGORY[category] ?? REPAIR_FALLBACK_BY_CATEGORY.other) };
}
