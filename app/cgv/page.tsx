import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  alternates: { canonical: `${siteConfig.url}/cgv` },
};

export default function CgvPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-4xl font-bold tracking-tight">CGV</h1>
      <p className="mt-6 text-muted-foreground">
        Les prix affichés en ligne sont indicatifs (« à partir de »). Le devis ferme est établi après diagnostic gratuit
        en boutique.
      </p>
      <p className="mt-4 text-muted-foreground">
        Garantie {siteConfig.stats.warrantyMonths} mois sur les réparations réalisées par {siteConfig.name}, usage normal.
      </p>
      <p className="mt-4 text-muted-foreground">
        Paiement en boutique à la remise de l&apos;appareil — CB, sans contact, espèces.
      </p>
    </article>
  );
}
