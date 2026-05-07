export const DEVICE_CATEGORIES = ["smartphone", "tablet", "computer", "console", "other"] as const;

export type DeviceCategoryId = (typeof DEVICE_CATEGORIES)[number];

export const DEVICE_CATEGORY_LABELS: Record<
  DeviceCategoryId,
  { title: string; description: string }
> = {
  smartphone: {
    title: "Smartphone",
    description: "Téléphone classique, pliable ou gaming — iPhone, Galaxy, Pixel, Xiaomi, OnePlus…",
  },
  tablet: {
    title: "Tablette",
    description: "iPad, Galaxy Tab, liseuses grand format, tablettes graphiques Android.",
  },
  computer: {
    title: "Ordinateur portable / fixe",
    description: "MacBook, Surface, PC portable, tour / mini-PC — Windows, macOS ou Linux.",
  },
  console: {
    title: "Console & accessoires",
    description: "PlayStation, Xbox, Switch, Steam Deck, manettes, docks — hors réparation TV.",
  },
  other: {
    title: "Autre appareil",
    description: "Montre, enceinte, routeur, périphérique USB — décrivez dans les notes.",
  },
};

export type BrandId =
  | "apple"
  | "samsung"
  | "huawei"
  | "xiaomi"
  | "google"
  | "oneplus"
  | "sony"
  | "microsoft"
  | "asus"
  | "nintendo"
  | "other";

export interface Brand {
  id: BrandId;
  name: string;
  /** Catégories où la marque apparaît dans le wizard */
  categories: DeviceCategoryId[];
}

export const BRANDS: Brand[] = [
  { id: "apple", name: "Apple", categories: ["smartphone", "tablet", "computer"] },
  { id: "samsung", name: "Samsung", categories: ["smartphone", "tablet"] },
  { id: "huawei", name: "Huawei", categories: ["smartphone", "tablet"] },
  { id: "xiaomi", name: "Xiaomi", categories: ["smartphone", "tablet"] },
  { id: "google", name: "Google", categories: ["smartphone"] },
  { id: "oneplus", name: "OnePlus", categories: ["smartphone"] },
  { id: "sony", name: "Sony", categories: ["smartphone", "tablet", "console"] },
  { id: "microsoft", name: "Microsoft", categories: ["computer", "console"] },
  { id: "asus", name: "Asus", categories: ["computer", "tablet"] },
  { id: "nintendo", name: "Nintendo", categories: ["console"] },
  { id: "other", name: "Autre marque", categories: ["smartphone", "tablet", "computer", "console", "other"] },
];

export function getBrandsForCategory(category: DeviceCategoryId): Brand[] {
  return BRANDS.filter((b) => b.categories.includes(category));
}
