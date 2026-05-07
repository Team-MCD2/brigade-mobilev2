import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Phone, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "À propos",
  description: `${siteConfig.name} — réparation transparente et locale à Toulouse.`,
  alternates: { canonical: `${siteConfig.url}/a-propos` },
};

export default function AboutPage() {
  return (
    <div>
      <section className="mx-auto max-w-2xl px-4 pb-12 pt-16 text-center sm:px-6 sm:pt-24">
        <Badge variant="outline" className="rounded-full font-num text-[11px] uppercase tracking-widest">
          Histoire
        </Badge>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Un atelier qui parle comme un produit.</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Clarté des prix, diagnostic gratuit, même promesse en ligne et en boutique.
        </p>
      </section>

      <article className="mx-auto max-w-2xl space-y-8 px-4 pb-16 text-lg leading-relaxed text-foreground/90 sm:px-6">
        <p>
          <strong className="text-foreground">{siteConfig.name}</strong> prolonge la vie de vos appareils avec une approche
          directe : moins de flou, plus de contrôle. Nous croyons au droit à la réparation — remplacer une pièce plutôt
          qu&apos;un appareil entier lorsque c&apos;est pertinent.
        </p>

        <div className="grid grid-cols-1 gap-8 border-y border-border py-10 sm:grid-cols-3 sm:gap-4">
          {[
            { v: `${siteConfig.stats.reviewCount}+`, l: "Clients" },
            { v: `${siteConfig.stats.rating}/5`, l: "Google" },
            { v: `${siteConfig.stats.warrantyMonths} mois`, l: "Garantie" },
          ].map((s) => (
            <div key={s.l} className="text-center sm:text-left">
              <p className="font-num text-3xl font-bold text-foreground sm:text-4xl">{s.v}</p>
              <p className="font-num mt-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-foreground">Transition de marque</h2>
        <p>
          Anciennement <strong>{siteConfig.legacyTradeName}</strong> sur la V1 — même adresse au 65 Route de Blagnac, même
          savoir-faire. La vitrine numérique évolue pour refléter un service plus lisible, plus outillé.
        </p>
      </article>

      <section className="border-t border-border bg-primary/[0.05] py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
          <p className="text-center text-muted-foreground sm:text-left">Diagnostic gratuit, sans engagement.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-lg">
              <Link href="/devis">
                <Sparkles className="size-4" />
                Devis <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-lg">
              <a href={`tel:${siteConfig.contact.phoneE164}`}>
                <Phone className="size-4" />
                {siteConfig.contact.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
