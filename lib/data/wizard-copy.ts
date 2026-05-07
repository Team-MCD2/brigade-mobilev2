import type { DeviceCategoryId } from "./brands";

/** Texte long sous les cartes « type d'appareil » — précision pour le client. */
export const DEVICE_CATEGORY_WIZARD_DETAIL: Record<DeviceCategoryId, string> = {
  smartphone:
    "Téléphone avec écran tactile, batterie intégrée, caméras avant/arrière, connecteur ou induction. Indiquez la marque puis le modèle exact (gravure au dos ou Réglages → Général → Informations). Si écran OLED pliable (Flip/Fold), choisissez le modèle listé ou « non listé » et précisez dans les notes.",
  tablet:
    "Tablette format 7 à 13 pouces (souvent iPad ou Galaxy Tab). Précisez le modèle (ex. iPad 10, Tab S9) : l’écran et la connectique varient fortement. Apple Pencil / stylet : mentionnez une panne stylet dans les notes si besoin.",
  computer:
    "Portable ou fixe : MacBook, Surface, PC portable Asus, tour… Indiquez la taille d’écran et la génération CPU si vous la connaissez. Alimentation externe, charnière, clavier rétroéclairé : cochez les cases correspondantes et détaillez dans les notes.",
  console:
    "Console de salon ou portable (Switch, PS5, Xbox…), manettes, dock, refroidissement. Précisez le code modèle (ex. Switch OLED) et si la panne suit un choc ou un liquide. Certains composants (lecteur optique, HDMI) se traitent au cas par cas — utilisez « Autre panne » si besoin.",
  other:
    "Montre connectée, enceinte, routeur, micro-onde non — restez sur un objet électronique que nous pouvons diagnostiquer. Décrivez la marque, le modèle et le symptôme dans les notes ; le tarif sera affiné en boutique.",
};

/** Intro sous le titre de l’étape « Pannes » selon la catégorie. */
export const PANNE_STEP_INTRO: Record<DeviceCategoryId, string> = {
  smartphone:
    "Cochez chaque symptôme actuel (plusieurs choix). Pour une panne intermittente, cochez la case la plus proche et expliquez le contexte (chargeur d’origine, après chute, eau salée/claire, etc.) dans les précisions.",
  tablet:
    "Les coûts varient surtout selon la taille d’écran et la collée complète (vitre + LCD/OLED). Si la tablette ne s’allume plus du tout, cochez aussi batterie ou connecteur selon le cas.",
  computer:
    "Séparez écran (fissures, bandes), batterie (gonflement, autonomie nulle), charge (USB-C / MagSafe / jack rond), et logiciel (mot de passe oublié, réinstallation). Pour surchauffe ou ventilateur bruyant, utilisez « Autre panne » avec détail.",
  console:
    "Manette drift, console qui ne démarre pas, pas d’image HDMI, lecteur qui refuse les disques : cochez ce qui correspond. Liquide versé : cochez désoxydation et décrivez la zone touchée.",
  other:
    "Choisissez les cases les plus proches ; si aucune ne correspond, cochez « Autre panne » et décrivez le comportement exact (LED, bip, odeur, etc.).",
};
