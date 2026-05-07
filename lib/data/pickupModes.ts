/** Modes de prise en charge — atelier local + retrait & postal */

export const PICKUP_MODES = ["boutique", "domicile_intra", "domicile_metro", "postal"] as const;

export type PickupModeId = (typeof PICKUP_MODES)[number];

export const PICKUP_MODE_META: Record<
  PickupModeId,
  { title: string; description: string; priceEuro: number; durationHint: string }
> = {
  boutique: {
    title: "Dépôt en boutique",
    description: "Venez à l'atelier — créneau ~30 min, diagnostic gratuit sur place.",
    priceEuro: 0,
    durationHint: "Souvent le jour même",
  },
  domicile_intra: {
    title: "Retrait à domicile — Toulouse intra-rocade",
    description: "Nous récupérons votre appareil à votre adresse (zone intra-rocade).",
    priceEuro: 19,
    durationHint: "Créneau sous 24–48h",
  },
  domicile_metro: {
    title: "Retrait à domicile — Métropole toulousaine",
    description: "Récupération à domicile dans la métropole (hors intra-rocade).",
    priceEuro: 29,
    durationHint: "Créneau sous 24–72h",
  },
  postal: {
    title: "Envoi postal",
    description: "Vous expédiez l'appareil — étiquette et instructions après validation du devis.",
    priceEuro: 9,
    durationHint: "Réparation après réception",
  },
};
