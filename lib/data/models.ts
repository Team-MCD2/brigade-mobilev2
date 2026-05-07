import type { BrandId, DeviceCategoryId } from "./brands";
import type { RepairId } from "./repairs";

export interface DeviceModel {
  id: string;
  slug: string;
  brandId: BrandId;
  name: string;
  category: DeviceCategoryId;
  /** Prix TTC indicatifs par type de panne — sources marché (Clinique / icox / 21phones) — TODO: validate with shop */
  repairs: Partial<Record<RepairId, number>>;
}

function appleIphone(
  id: string,
  name: string,
  base: { screen: number; battery: number; camera: number; charge: number },
): DeviceModel {
  return {
    id: `apple-${id}`,
    slug: id,
    brandId: "apple",
    name,
    category: "smartphone",
    repairs: {
      screen: base.screen,
      battery: base.battery,
      camera: base.camera,
      chargePort: base.charge,
      speaker: 59,
      desox: 79,
      software: 39,
      unlock: 49,
      other: 0,
    },
  };
}

const APPLE_IPHONES: DeviceModel[] = [
  appleIphone("iphone-11", "iPhone 11", { screen: 109, battery: 49, camera: 79, charge: 59 }),
  appleIphone("iphone-12", "iPhone 12", { screen: 119, battery: 49, camera: 79, charge: 59 }),
  appleIphone("iphone-12-mini", "iPhone 12 mini", { screen: 119, battery: 49, camera: 79, charge: 59 }),
  appleIphone("iphone-13", "iPhone 13", { screen: 99, battery: 49, camera: 79, charge: 59 }),
  appleIphone("iphone-13-mini", "iPhone 13 mini", { screen: 99, battery: 49, camera: 79, charge: 59 }),
  appleIphone("iphone-13-pro", "iPhone 13 Pro", { screen: 189, battery: 59, camera: 89, charge: 69 }),
  appleIphone("iphone-13-pro-max", "iPhone 13 Pro Max", { screen: 199, battery: 59, camera: 89, charge: 69 }),
  appleIphone("iphone-14", "iPhone 14", { screen: 129, battery: 49, camera: 79, charge: 59 }),
  appleIphone("iphone-14-plus", "iPhone 14 Plus", { screen: 139, battery: 49, camera: 79, charge: 59 }),
  appleIphone("iphone-14-pro", "iPhone 14 Pro", { screen: 249, battery: 59, camera: 99, charge: 69 }),
  appleIphone("iphone-14-pro-max", "iPhone 14 Pro Max", { screen: 269, battery: 59, camera: 99, charge: 69 }),
  appleIphone("iphone-15", "iPhone 15", { screen: 219, battery: 59, camera: 89, charge: 69 }),
  appleIphone("iphone-15-plus", "iPhone 15 Plus", { screen: 229, battery: 59, camera: 89, charge: 69 }),
  appleIphone("iphone-15-pro", "iPhone 15 Pro", { screen: 329, battery: 69, camera: 109, charge: 79 }),
  appleIphone("iphone-15-pro-max", "iPhone 15 Pro Max", { screen: 349, battery: 69, camera: 109, charge: 79 }),
  appleIphone("iphone-16", "iPhone 16", { screen: 239, battery: 59, camera: 95, charge: 75 }),
  appleIphone("iphone-16-plus", "iPhone 16 Plus", { screen: 249, battery: 59, camera: 95, charge: 75 }),
  appleIphone("iphone-16-pro", "iPhone 16 Pro", { screen: 359, battery: 69, camera: 119, charge: 85 }),
  appleIphone("iphone-16-pro-max", "iPhone 16 Pro Max", { screen: 379, battery: 69, camera: 119, charge: 85 }),
];

const SAMSUNG_MODELS: DeviceModel[] = [
  {
    id: "samsung-galaxy-s21",
    slug: "galaxy-s21",
    brandId: "samsung",
    name: "Galaxy S21",
    category: "smartphone",
    repairs: {
      screen: 179,
      battery: 59,
      camera: 79,
      chargePort: 59,
      speaker: 55,
      desox: 79,
      software: 39,
      unlock: 49,
    },
  },
  {
    id: "samsung-galaxy-s22",
    slug: "galaxy-s22",
    brandId: "samsung",
    name: "Galaxy S22",
    category: "smartphone",
    repairs: {
      screen: 199,
      battery: 59,
      camera: 85,
      chargePort: 59,
      speaker: 55,
      desox: 79,
      software: 39,
      unlock: 49,
    },
  },
  {
    id: "samsung-galaxy-s23",
    slug: "galaxy-s23",
    brandId: "samsung",
    name: "Galaxy S23",
    category: "smartphone",
    repairs: {
      screen: 219,
      battery: 59,
      camera: 89,
      chargePort: 65,
      speaker: 55,
      desox: 85,
      software: 39,
      unlock: 49,
    },
  },
  {
    id: "samsung-galaxy-a54",
    slug: "galaxy-a54",
    brandId: "samsung",
    name: "Galaxy A54",
    category: "smartphone",
    repairs: {
      screen: 129,
      battery: 49,
      camera: 69,
      chargePort: 49,
      speaker: 45,
      desox: 69,
      software: 35,
      unlock: 45,
    },
  },
];

const APPLE_TABLETS: DeviceModel[] = [
  {
    id: "apple-ipad-10",
    slug: "ipad-10",
    brandId: "apple",
    name: "iPad 10",
    category: "tablet",
    repairs: {
      screen: 189,
      battery: 79,
      chargePort: 69,
      speaker: 59,
      desox: 89,
      software: 45,
      unlock: 55,
    },
  },
  {
    id: "apple-ipad-air-m2",
    slug: "ipad-air-m2",
    brandId: "apple",
    name: "iPad Air (M2)",
    category: "tablet",
    repairs: {
      screen: 249,
      battery: 89,
      chargePort: 75,
      speaker: 65,
      desox: 95,
      software: 45,
      unlock: 55,
    },
  },
];

const APPLE_COMPUTERS: DeviceModel[] = [
  {
    id: "apple-macbook-air-m1",
    slug: "macbook-air-m1",
    brandId: "apple",
    name: "MacBook Air (M1)",
    category: "computer",
    repairs: {
      screen: 449,
      battery: 149,
      camera: 99,
      chargePort: 89,
      speaker: 79,
      desox: 129,
      software: 59,
      unlock: 69,
    },
  },
  {
    id: "apple-macbook-pro-14-m3",
    slug: "macbook-pro-14-m3",
    brandId: "apple",
    name: "MacBook Pro 14\" (M3)",
    category: "computer",
    repairs: {
      screen: 699,
      battery: 189,
      camera: 119,
      chargePort: 99,
      speaker: 89,
      desox: 159,
      software: 69,
      unlock: 79,
    },
  },
];

export const MODELS: DeviceModel[] = [
  ...APPLE_IPHONES,
  ...APPLE_TABLETS,
  ...APPLE_COMPUTERS,
  ...SAMSUNG_MODELS,
];

export function getModelsByBrand(brandId: BrandId, category?: DeviceCategoryId): DeviceModel[] {
  return MODELS.filter((m) => {
    if (m.brandId !== brandId) return false;
    if (category && m.category !== category) return false;
    return true;
  });
}

export function getModelBySlug(brandSlug: string, modelSlug: string): DeviceModel | undefined {
  const brandMap: Record<string, BrandId> = {
    apple: "apple",
    samsung: "samsung",
    huawei: "huawei",
    xiaomi: "xiaomi",
    google: "google",
    oneplus: "oneplus",
    sony: "sony",
    microsoft: "microsoft",
    asus: "asus",
    other: "other",
  };
  const bid = brandMap[brandSlug];
  if (!bid) return undefined;
  return MODELS.find((m) => m.brandId === bid && m.slug === modelSlug);
}

export function getModelById(id: string): DeviceModel | undefined {
  return MODELS.find((m) => m.id === id);
}

/** Tarifs moyens si modèle inconnu — pour devis orienté */
export function getFallbackRepairs(category: DeviceCategoryId): Partial<Record<RepairId, number>> {
  switch (category) {
    case "smartphone":
      return { screen: 129, battery: 49, camera: 79, chargePort: 59, speaker: 55, desox: 79, software: 39, unlock: 49 };
    case "tablet":
      return { screen: 189, battery: 79, chargePort: 69, speaker: 59, desox: 89, software: 45, unlock: 55 };
    case "computer":
      return { screen: 399, battery: 129, chargePort: 89, speaker: 79, desox: 129, software: 59, unlock: 69 };
    default:
      return { screen: 99, battery: 49, software: 39, other: 49 };
  }
}
