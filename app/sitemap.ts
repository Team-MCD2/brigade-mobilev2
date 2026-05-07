import type { MetadataRoute } from "next";

import { BRANDS } from "@/lib/data/brands";
import { MODELS } from "@/lib/data/models";
import { SERVICE_PAGES } from "@/lib/data/servicePages";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const brandPaths = BRANDS.map((b) => `/reparations/${b.id}`);
  const staticRoutes = [
    "",
    "/devis",
    "/services",
    "/boutique",
    "/a-propos",
    "/avis",
    "/faq",
    "/contact",
    "/pro",
    "/mentions-legales",
    "/confidentialite",
    "/cgv",
    ...brandPaths,
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const services = SERVICE_PAGES.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const models = MODELS.map((m) => ({
    url: `${base}/reparations/${m.brandId}/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...services, ...models];
}
