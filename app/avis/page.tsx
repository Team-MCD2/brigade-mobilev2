import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Quote, Sparkles, Star } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GOOGLE_REVIEWS } from "@/lib/data/googleReviews";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Avis clients",
  description: `Note ${siteConfig.stats.rating}/5 — avis Google, ${siteConfig.name} Toulouse.`,
  alternates: { canonical: `${siteConfig.url}/avis` },
};

export default function AvisPage() {
  const [featured, ...others] = GOOGLE_REVIEWS;

  const ld = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.stats.rating,
      reviewCount: siteConfig.stats.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: GOOGLE_REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.text,
    })),
  };

  return (
    <div>
      <JsonLd data={ld} />
      <section className="mx-auto max-w-4xl px-4 pb-8 pt-16 text-center sm:px-6 sm:pt-24">
        <Badge variant="outline" className="rounded-full font-num text-[11px] uppercase tracking-widest">
          Avis Google
        </Badge>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          <span className="font-num text-primary">{siteConfig.stats.rating}/5</span>
          <br />
          La preuve au quotidien.
        </h1>
        <p className="mt-4 text-muted-foreground">
          <span className="font-num font-medium text-foreground">{siteConfig.stats.reviewCount}+</span> avis — sélection
          ci-dessous.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6">
        <figure className="rounded-2xl border border-border bg-muted/40 p-8 sm:p-12">
          <Quote className="size-10 text-primary/40" aria-hidden />
          <blockquote className="mt-4 text-pretty text-2xl font-semibold leading-snug tracking-tight sm:text-4xl">
            {featured.text}
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <div>
              <p className="font-semibold">{featured.author}</p>
              <p className="font-num text-xs uppercase tracking-wider text-muted-foreground">Google</p>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: featured.rating }).map((_, i) => (
                <Star key={i} className="size-5 fill-rating-star text-rating-star" />
              ))}
            </div>
          </figcaption>
        </figure>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="columns-1 gap-4 md:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
          {others.map((r, idx) => (
            <article key={`${r.author}-${idx}`} className="rounded-xl border border-border bg-card p-6">
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-rating-star text-rating-star" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed">{r.text}</p>
              <p className="mt-4 text-sm font-medium">{r.author}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <p className="text-center text-muted-foreground sm:text-left">Rejoignez nos clients satisfaits.</p>
          <Button asChild className="rounded-lg">
            <Link href="/devis">
              <Sparkles className="size-4" />
              Devis <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
