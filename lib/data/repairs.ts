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
  "other",
] as const;

export type RepairId = (typeof REPAIR_IDS)[number];

export const REPAIR_LABELS: Record<RepairId, { label: string; description: string }> = {
  screen: { label: "Écran / vitre / tactile", description: "Casse, lignes, taches, tactile mort" },
  battery: { label: "Batterie", description: "Autonomie faible, gonflement, ne charge plus" },
  camera: { label: "Caméra", description: "Flou, noir, impossible d'ouvrir l'appareil photo" },
  chargePort: { label: "Connecteur de charge", description: "Charge intermittente, port abîmé" },
  speaker: { label: "Haut-parleur / micro", description: "Pas de son, son distordu, micro HS" },
  desox: { label: "Désoxydation (liquide)", description: "Oxydation après contact avec l'eau" },
  software: { label: "Logiciel / système", description: "Blocages, bootloop, restauration" },
  unlock: { label: "Déblocage", description: "Mot de passe oublié, FRP (sous conditions)" },
  other: { label: "Autre panne", description: "Précisez dans les notes" },
};
