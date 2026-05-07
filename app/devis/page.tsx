import { Suspense } from "react";
import type { Metadata } from "next";

import { QuoteWizard } from "@/app/devis/_components/quote-wizard";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Devis réparation en ligne",
  description:
    "Estimez le coût de votre réparation smartphone, tablette ou MacBook — parcours guidé, prix indicatif, Toulouse.",
  alternates: { canonical: `${siteConfig.url}/devis` },
};

export default function DevisPage() {
  return (
    <div className="bg-muted/30">
      <Suspense
        fallback={
          <div className="py-24 text-center font-num text-sm text-muted-foreground">Chargement du devis…</div>
        }
      >
        <QuoteWizard />
      </Suspense>
    </div>
  );
}
