export const DEVICE_CATEGORIES = ["smartphone", "tablet", "computer", "console", "other"] as const;

export type DeviceCategoryId = (typeof DEVICE_CATEGORIES)[number];

export const DEVICE_CATEGORY_LABELS: Record<
  DeviceCategoryId,
  { title: string; description: string }
> = {
  smartphone: {
    title: "Smartphone",
    description: "iPhone, Samsung, Google Pixel, Xiaomi…",
  },
  tablet: {
    title: "Tablette",
    description: "iPad, Galaxy Tab, Huawei MediaPad…",
  },
  computer: {
    title: "Ordinateur portable / fixe",
    description: "MacBook, iMac, PC Windows & Linux",
  },
  console: {
    title: "Console & accessoires",
    description: "Switch, manettes, casques…",
  },
  other: {
    title: "Autre appareil",
    description: "Smartwatch, imprimante, unité centrale…",
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
  { id: "other", name: "Autre marque", categories: ["smartphone", "tablet", "computer", "console", "other"] },
];

export function getBrandsForCategory(category: DeviceCategoryId): Brand[] {
  return BRANDS.filter((b) => b.categories.includes(category));
}
