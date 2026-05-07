/** Pages SEO services — contenu marketing + ancres devis */

export interface ServicePageDef {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  body: string[];
}

export const SERVICE_PAGES: ServicePageDef[] = [
  {
    slug: "ecran-iphone-toulouse",
    title: "Réparation écran iPhone à Toulouse",
    description:
      "Remplacement vitre + OLED/LCD iPhone — express ~30 min, pièces qualité, garantie 6 mois. Devis en ligne instantané.",
    keywords: ["écran iPhone Toulouse", "vitre cassée Blagnac", "réparation iPhone Cité Madrid"],
    body: [
      "Un écran fissuré ou un tactile qui « part dans tous les sens » ? Notre atelier à 65 Route de Blagnac intervient sur toute la gamme iPhone, du diagnostic gratuit à la pose en conditions contrôlées.",
      "Les tarifs affichés sur le devis en ligne sont indicatifs (« à partir de ») et alignés sur les pratiques des réparateurs indépendants en France — le prix final est confirmé après diagnostic gratuit en boutique.",
    ],
  },
  {
    slug: "batterie-smartphone",
    title: "Changement de batterie smartphone",
    description: "Batterie gonflée, autonomie en chute libre, téléphone qui s'éteint ? Remplacement rapide toutes marques.",
    keywords: ["batterie iPhone Toulouse", "batterie Samsung", "Santé batterie"],
    body: [
      "Nous utilisons des batteries compatibles certifiées ou d'origine selon disponibilité et modèle — nous vous expliquons la différence avant toute intervention.",
      "Comptez en moyenne 30 minutes sur place ; la garantie pièce & main d'œuvre est de 6 mois.",
    ],
  },
  {
    slug: "macbook-apple",
    title: "Réparation MacBook & iMac",
    description: "Écran, clavier, batterie, connectique, logiciel — MacBook Air/Pro et iMac à Toulouse.",
    keywords: ["réparation MacBook Toulouse", "écran MacBook", "batterie MacBook Air M1"],
    body: [
      "Les réparations Mac demandent souvent un diagnostic approfondi : nous établissons un devis clair avant toute commande de pièce.",
      "Pour les interventions lourdes, l'option envoi postal ou dépôt prolongé est possible.",
    ],
  },
  {
    slug: "desoxydation-eau",
    title: "Désoxydation après contact avec l'eau",
    description: "Chute dans l'eau ? Éteignez l'appareil et venez vite : traitement anti-corrosion et tests.",
    keywords: ["téléphone tombé dans l'eau", "désoxydation Toulouse"],
    body: [
      "Plus vite l'appareil est démonté et nettoyé, plus les chances de sauvegarde des données sont élevées.",
      "La désoxydation ne garantit pas toujours la réparation complète : nous vous proposons une alternative claire si la carte mère est trop endommagée.",
    ],
  },
  {
    slug: "connecteur-charge",
    title: "Connecteur de charge & port USB-C / Lightning",
    description: "Charge lente, câble qui bouge, port abîmé — remplacement du connecteur.",
    keywords: ["connecteur charge iPhone", "port USB-C cassé"],
    body: [
      "Souvent confondu avec une batterie HS, un connecteur fatigué se diagnostique en quelques minutes — diagnostic gratuit en boutique.",
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePageDef | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
