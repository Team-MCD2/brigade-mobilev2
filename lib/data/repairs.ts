/** Types de panne — wizard guidé La Brigade Mobile */

export const REPAIR_IDS = [
  "screen",
  "battery",
  "camera",
  "chargePort",
  "speaker",
  "desox",
  "software",
  "unlock",
  "housing",
  "network",
  "other",
] as const;

export type RepairId = (typeof REPAIR_IDS)[number];

export const REPAIR_LABELS: Record<RepairId, { label: string; description: string }> = {
  screen: {
    label: "Écran / vitre / tactile",
    description:
      "Casse, rayures profondes, taches noires ou vertes, lignes fixes, tactile partiel ou mort, halo ou décollement (OLED). Précisez face avant uniquement ou aussi vitre arrière.",
  },
  battery: {
    label: "Batterie",
    description:
      "Autonomie effondrée, extinction brutale sous 20 %, gonflement de coque, message « Service batterie », ne tient plus la charge ou charge très lentement alors que le port est sain.",
  },
  camera: {
    label: "Caméra",
    description:
      "Appareil photo noir, flou permanent, focus impossible, flash HS, caméra avant ou arrière seulement — indiquez laquelle dans les notes si vous savez.",
  },
  chargePort: {
    label: "Connecteur de charge",
    description:
      "USB-C / Lightning / jack : jeu excessif, charge aléatoire selon l’angle, reconnaissance intermittente PC, pas de charge rapide. Indiquez chargeur d’origine ou tiers.",
  },
  speaker: {
    label: "Haut-parleur / micro / audio",
    description:
      "Son distordu, volume faible, grésillement, micro inaudible en appel, haut-parleur du bas HS, pas de vibreur — précisez haut-parleur ou micro dans les notes.",
  },
  desox: {
    label: "Désoxydation (liquide)",
    description:
      "Après eau, café, lessive, humidité soudaine. Même si l’appareil « sèche » et rallume, l’oxydation progresse — indiquez le liquide et depuis combien de temps.",
  },
  software: {
    label: "Logiciel / système",
    description:
      "Bootloop, restauration impossible, mise à jour bloquée, compte à retirer (sous conditions légales), réinstallation propre, données à sauver avant intervention.",
  },
  unlock: {
    label: "Déblocage / mot de passe",
    description:
      "Code oublié, compte Google/Apple selon politique, FRP — nous vérifions la preuve d’achat ; certaines protections ne sont pas contournables légalement.",
  },
  housing: {
    label: "Vitre arrière / châssis / coque",
    description:
      "Dos en verre fissuré, coque déformée après chute, cadre tordu, joints d’étanchéité à refaire — précisez iPhone avec vitre arrière séparée ou collée à la batterie.",
  },
  network: {
    label: "Wi‑Fi / Bluetooth / réseau",
    description:
      "Wi‑Fi grisé ou lent, Bluetooth qui ne pair plus, perte de signal mobile (souvent après chute ou désoxydation) — indiquez si la 5G / 4G seule est touchée.",
  },
  other: {
    label: "Autre panne",
    description:
      "NFC, Face ID / capteurs, bouton volume/power, vibreur, refroidissement, charnière écran, connectique HDMI — décrivez le symptôme précisément.",
  },
};
