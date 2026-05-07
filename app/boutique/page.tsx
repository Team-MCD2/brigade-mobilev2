import type { Metadata } from "next";

import { BoutiqueClient } from "@/app/boutique/boutique-client";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Notre boutique Toulouse",
  description: `${siteConfig.address.full} — accès L1 & bus 70, arrêt Cité Madrid.`,
  alternates: { canonical: `${siteConfig.url}/boutique` },
};

export default function BoutiquePage() {
  return <BoutiqueClient />;
}
