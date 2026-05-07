/** Modes de prise en charge — atelier local + retrait & postal */

export const PICKUP_MODES = ["boutique", "domicile_intra", "domicile_metro", "postal"] as const;

export type PickupModeId = (typeof PICKUP_MODES)[number];

export const PICKUP_MODE_META: Record<
  PickupModeId,
  { title: string; description: string; priceEuro: number; durationHint: string }
> = {
  boutique: {
    title: "Dépôt en boutique",
    description:
      "65 Route de Blagnac — diagnostic gratuit sur place, souvent réparation le jour même pour écran / batterie / connecteur. Sans rendez-vous pour le diagnostic ; créneau pour reprise si besoin.",
    priceEuro: 0,
    durationHint: "Souvent le jour même",
  },
  domicile_intra: {
    title: "Retrait à domicile — Toulouse intra-rocade",
    description:
      "Nous venons récupérer l’appareil à votre adresse (périphérie intérieure). Idéal si vous ne pouvez pas vous déplacer ; l’appareil repart ensuite à l’atelier pour intervention.",
    priceEuro: 19,
    durationHint: "Créneau sous 24–48h",
  },
  domicile_metro: {
    title: "Retrait à domicile — Métropole toulousaine",
    description:
      "Colomiers, Blagnac, Tournefeuille, Labège, etc. (hors petite couronne immédiate). Frais de déplacement adaptés ; même suivi atelier qu’en boutique.",
    priceEuro: 29,
    durationHint: "Créneau sous 24–72h",
  },
  postal: {
    title: "Envoi postal",
    description:
      "Vous emballez l’appareil (bulles, carton rigide) et l’expédiez. Nous vous envoyons l’étiquette ou l’adresse dédiée après validation du devis en ligne — idéal hors Toulouse.",
    priceEuro: 9,
    durationHint: "Réparation après réception",
  },
};
