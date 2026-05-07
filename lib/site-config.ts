/** Single source of truth — La Brigade Mobile (ex-ReparePhone V1 Toulouse) */

export const siteConfig = {
  name: "La Brigade Mobile",
  /** Ancien nom commercial affiché dans l'en-tête (transition marque) */
  legacyTradeName: "ReparePhone",
  tagline: "Réparation smartphone, tablette & ordinateur à Toulouse",
  description:
    "Réparation express en ~30 min, garantie 6 mois, diagnostic gratuit. iPhone, Samsung, Huawei, MacBook, PC — 65 Route de Blagnac, Toulouse.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://brigademobile.fr",
  locale: "fr-FR",
  contact: {
    phoneDisplay: "07 56 91 65 93",
    phoneE164: "+33756916593",
    /** Email fictif pour démo — à remplacer par la boîte réelle */
    email: "devis@labrigademobile.fr",
    whatsappE164: "33756916593",
  },
  address: {
    street: "65 Route de Blagnac",
    postalCode: "31300",
    city: "Toulouse",
    country: "FR",
    full: "65 Route de Blagnac, 31300 Toulouse",
    /** Accès transports (V1) */
    transit: "Métro L1 & Bus 70 — arrêt « Cité Madrid », juste en face",
  },
  geo: {
    lat: 43.635_28,
    lng: 1.39_38,
  },
  hours: {
    weekdays: "Lun–Ven : 9h–19h",
    saturday: "Sam : 10h–18h",
    closed: "Dimanche : fermé",
  },
  stats: {
    rating: 4.9,
    reviewCount: 200,
    repairMinutes: 30,
    warrantyMonths: 6,
  },
  social: {
    /** Recherche web : pas d'URL officielle dédiée — lien Google Maps lieu */
    googleMaps:
      "https://www.google.com/maps/search/?api=1&query=65+Route+de+Blagnac+31300+Toulouse",
    instagram: "",
    facebook: "",
  },
  credit: "Fait par Microdidact",
} as const;

export type SiteConfig = typeof siteConfig;
