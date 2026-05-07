"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Bus, Clock, MapPin, Navigation, Phone, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const BoutiqueMap = dynamic(() => import("@/components/boutique-map").then((m) => m.BoutiqueMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
      Carte…
    </div>
  ),
});

export function BoutiqueClient() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-4 pb-8 pt-16 text-center sm:px-6 sm:pt-24">
        <Badge variant="outline" className="rounded-full font-num text-[11px] uppercase tracking-widest">
          Accès
        </Badge>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Boutique Toulouse</h1>
        <p className="mt-4 text-muted-foreground">
          {siteConfig.address.full} — sans rendez-vous pour le diagnostic.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
          <div className="overflow-hidden rounded-xl border border-border">
            <BoutiqueMap />
          </div>
          <div className="space-y-4">
            <article className="rounded-xl border border-border bg-card p-6">
              <MapPin className="size-5 text-primary" aria-hidden />
              <h2 className="mt-3 font-semibold">Adresse</h2>
              <p className="mt-1 text-sm text-muted-foreground">{siteConfig.address.full}</p>
              <Button asChild variant="link" className="mt-2 h-auto px-0 text-primary">
                <a href={siteConfig.social.googleMaps} target="_blank" rel="noreferrer">
                  <Navigation className="size-4" />
                  Itinéraire Google Maps
                </a>
              </Button>
            </article>
            <article className="rounded-xl border border-border bg-card p-6">
              <Clock className="size-5 text-primary" aria-hidden />
              <h2 className="mt-3 font-semibold">Horaires</h2>
              <ul className="mt-2 space-y-0.5 text-sm text-muted-foreground">
                <li>{siteConfig.hours.weekdays}</li>
                <li>{siteConfig.hours.saturday}</li>
                <li>{siteConfig.hours.closed}</li>
              </ul>
            </article>
            <article className="rounded-xl border border-border bg-card p-6">
              <Bus className="size-5 text-primary" aria-hidden />
              <h2 className="mt-3 font-semibold">Transports</h2>
              <p className="mt-2 text-sm text-muted-foreground">{siteConfig.address.transit}</p>
            </article>
            <article className="rounded-xl border border-primary/20 bg-primary/[0.05] p-6">
              <h2 className="font-semibold">Avant de venir</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Vérifiez la dispo pièces ou estimez en ligne — même logique tarifaire.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild size="sm">
                  <Link href="/devis">
                    <Sparkles className="size-4" />
                    Devis
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={`tel:${siteConfig.contact.phoneE164}`}>
                    <Phone className="size-4" />
                    Appeler
                  </a>
                </Button>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
