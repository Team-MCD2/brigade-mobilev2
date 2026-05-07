import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Laptop,
  MapPin,
  MessageSquare,
  Phone,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { GOOGLE_REVIEWS } from "@/lib/data/googleReviews";
import { siteConfig } from "@/lib/site-config";

const brands = [
  { name: "Apple", href: "/reparations/apple" },
  { name: "Samsung", href: "/reparations/samsung" },
  { name: "Huawei", href: "/reparations/huawei" },
  { name: "Xiaomi", href: "/reparations/xiaomi" },
  { name: "Google", href: "/reparations/google" },
  { name: "Oppo", href: "/reparations/oppo" },
  { name: "OnePlus", href: "/reparations/oneplus" },
  { name: "Sony", href: "/reparations/sony" },
  { name: "Microsoft", href: "/reparations/microsoft" },
  { name: "Asus", href: "/reparations/asus" },
] as const;

const homeFaqs = [
  {
    q: "Le prix du devis en ligne est-il garanti ?",
    a: "Non — il est indicatif (« à partir de »). Le tarif définitif est confirmé après diagnostic gratuit en boutique.",
  },
  {
    q: "Combien de temps prend une réparation ?",
    a: `En moyenne ${siteConfig.stats.repairMinutes} minutes pour les interventions courantes (écran, batterie, connecteur) — souvent le jour même.`,
  },
  {
    q: "Quelle est votre garantie ?",
    a: `${siteConfig.stats.warrantyMonths} mois pièces et main d'œuvre sur les réparations réalisées par nos techniciens.`,
  },
  {
    q: "Le diagnostic est-il gratuit ?",
    a: "Oui, sans engagement. Vous repartez avec un devis clair même si vous ne faites pas réparer.",
  },
  {
    q: "Quelles marques réparez-vous ?",
    a: "Apple, Samsung, Huawei, Xiaomi, Google Pixel, OnePlus, Sony, Microsoft Surface, Asus — et la plupart des autres sur devis.",
  },
];

export default function HomePage() {
  const [featured] = GOOGLE_REVIEWS;
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqLd} />
      {/* 1 Hero — asymétrique, pas carte centrée */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.06)_1px,transparent_0)] [background-size:20px_20px]"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-section-md sm:px-6">
          <div className="max-w-3xl border-l-4 border-primary pl-6 sm:pl-10">
            <p className="font-num label-caps tracking-[0.4em] text-primary">Atelier · {siteConfig.address.city}</p>
            <h1 className="font-heading heading-display mt-6 font-normal text-foreground">
              On lit le problème.
              <span className="mt-2 block text-muted-foreground">On cite le prix. On répare.</span>
            </h1>
            <p className="lede mt-8 max-w-xl text-muted-foreground">
              Diagnostic gratuit en boutique, devis guidé en ligne, garantie{" "}
              <span className="font-num text-foreground">{siteConfig.stats.warrantyMonths} mois</span> — sans promesse
              creuse ni jargon marketing.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-sm px-8 uppercase tracking-wider">
                <Link href="/devis">
                  <Sparkles className="size-4" aria-hidden />
                  Devis
                  <ArrowRight className="size-4 opacity-80" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-sm border-primary/50 px-8 uppercase tracking-wider">
                <Link href="/boutique">
                  <MapPin className="size-4" aria-hidden />
                  Adresse
                </Link>
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="flex" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-rating-star text-rating-star" />
                  ))}
                </span>
                <span className="font-num text-foreground">{siteConfig.stats.rating}/5</span>
                <span className="text-border">|</span>
                <span className="font-num">{siteConfig.stats.reviewCount}+ avis</span>
              </span>
              <span className="font-num text-xs uppercase tracking-[0.25em]">{siteConfig.address.transit}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2 Marques — bandeau typographique */}
      <section className="border-b border-border bg-muted/50 py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-2 px-4 font-num text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground sm:px-6 sm:gap-x-5">
          {brands.map((b, i) => (
            <span key={b.name} className="inline-flex items-center gap-x-3 sm:gap-x-5">
              {i > 0 ? <span className="text-border" aria-hidden>/</span> : null}
              <Link
                href={b.href}
                className="nav-focus rounded-sm text-foreground/90 underline decoration-transparent underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:text-primary focus-visible:decoration-primary"
              >
                {b.name}
              </Link>
            </span>
          ))}
          <span className="inline-flex items-center gap-x-3 sm:gap-x-5">
            <span className="text-border" aria-hidden>/</span>
            <Link
              href="/devis"
              className="nav-focus rounded-sm text-primary underline decoration-primary/50 underline-offset-4 transition-colors hover:decoration-primary focus-visible:decoration-primary"
            >
              Devis (toutes marques)
            </Link>
          </span>
        </div>
        <p className="mx-auto mt-4 max-w-2xl px-4 text-center text-xs text-muted-foreground sm:text-sm">
          Consoles, PC portables, autres appareils électroniques… — même parcours sur{" "}
          <Link href="/devis" className="font-medium text-primary underline underline-offset-2 hover:no-underline">
            le devis en ligne
          </Link>
          .
        </p>
      </section>

      {/* 3 Services — colonne + liste */}
      <section className="border-y border-border bg-muted/25">
        <div className="mx-auto max-w-6xl px-4 py-section-sm sm:px-6">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
            <div>
              <p className="font-num label-caps text-primary">Périmètre</p>
              <h2 className="font-heading heading-section mt-5 max-w-xl text-foreground">
                Ce qu&apos;on touche, au quotidien.
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground">
                Pas d&apos;icônes «&nbsp;appli&nbsp;» — des liens vers des fiches utiles, point.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 font-num text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:underline"
                >
                  Tout l&apos;index
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  href="/devis"
                  className="inline-flex items-center gap-2 font-num text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:underline"
                >
                  Devis en ligne
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>

            <nav className="flex flex-col border-t border-border lg:border-t-0 lg:border-l lg:border-border lg:pl-12 lg:pt-0" aria-label="Services phares">
              {[
                {
                  href: "/services/ecran-iphone-toulouse",
                  title: "Smartphones & tablettes",
                  desc: "Écran, batterie, caméra, connecteur, désoxydation — atelier, pièces contrôlées.",
                  code: "01",
                },
                {
                  href: "/services/connecteur-charge",
                  title: "Connecteur & charge",
                  desc: "Port usé, charge intermittente.",
                  code: "02",
                },
                {
                  href: "/services/desoxydation-eau",
                  title: "Désoxydation",
                  desc: "Contact avec l&apos;eau — agir vite.",
                  code: "03",
                },
                {
                  href: "/devis",
                  title: "Diagnostic gratuit",
                  desc: "Sans engagement — devis clair sur place ou en ligne.",
                  code: "04",
                },
              ].map((row) => (
                <Link
                  key={row.href}
                  href={row.href}
                  className="group grid grid-cols-[auto_1fr_auto] gap-x-5 gap-y-1 border-b border-border py-7 first:border-t-0 lg:first:border-t lg:pt-0"
                >
                  <span className="font-num text-[10px] font-medium tabular-nums uppercase tracking-wider text-primary">
                    {row.code}
                  </span>
                  <div className="min-w-0">
                    <p className="font-heading text-lg tracking-tight text-foreground group-hover:text-primary">{row.title}</p>
                    <p className="mt-1.5 text-sm text-muted-foreground">{row.desc}</p>
                  </div>
                  <ArrowRight
                    className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary"
                    aria-hidden
                  />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* 4 Parcours — timeline verticale */}
      <section className="border-y border-border bg-background py-section-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-num label-caps text-primary">Déroulé</p>
          <h2 className="font-heading heading-section mt-4 max-w-xl">Trois temps. Zéro flou.</h2>
          <ol className="mt-14 max-w-2xl space-y-12">
            {[
              {
                n: "01",
                title: "Vous décrivez",
                desc: "Devis en ligne ou passage boutique — même transparence.",
                Icon: MessageSquare,
              },
              {
                n: "02",
                title: "On diagnostique",
                desc: "Gratuit, sous vos yeux — prix ferme avant intervention.",
                Icon: Search,
              },
              {
                n: "03",
                title: "On répare",
                desc: `Souvent ~${siteConfig.stats.repairMinutes} min · garantie ${siteConfig.stats.warrantyMonths} mois.`,
                Icon: ShieldCheck,
              },
            ].map((step, i, arr) => (
              <li key={step.n} className="flex gap-6 sm:gap-8">
                <div className="flex flex-col items-center">
                  <span className="font-num flex size-10 shrink-0 items-center justify-center border-2 border-primary bg-background text-[10px] font-bold text-primary">
                    {step.n}
                  </span>
                  {i < arr.length - 1 ? <span className="mt-2 w-px grow min-h-[2.5rem] bg-primary/40" aria-hidden /> : null}
                </div>
                <div className="min-w-0 pb-2">
                  <step.Icon className="size-5 text-primary" aria-hidden />
                  <h3 className="font-heading mt-2 text-xl tracking-tight">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 Pourquoi + avis — grille serrée, citation mise en exergue */}
      <section className="mx-auto max-w-6xl px-4 py-section-sm sm:px-6">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-10">
          <div className="lg:col-span-3">
            <p className="font-num label-caps text-primary">Terrain</p>
            <h2 className="font-heading heading-section mt-4">Vitesse, clarté, garantie — sans slide PowerPoint.</h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2">
              {[
                { t: "Rapide", d: `Interventions courantes en ~${siteConfig.stats.repairMinutes} min.`, Icon: Clock },
                { t: "Transparent", d: "Prix indicatif en ligne, diagnostic gratuit pour figer le montant.", Icon: CheckCircle2 },
                { t: "Garanti", d: `${siteConfig.stats.warrantyMonths} mois pièces & main d'œuvre.`, Icon: Shield },
                { t: "Polyvalent", d: "MacBook, PC, tablettes — voir Services.", Icon: Laptop },
              ].map((b) => (
                <li key={b.t} className="border-l-2 border-primary/40 pl-5">
                  <b.Icon className="size-4 text-primary" aria-hidden />
                  <p className="font-heading mt-3 text-lg tracking-tight">{b.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
                </li>
              ))}
            </ul>
          </div>
          <aside className="flex flex-col border border-primary/30 bg-muted/30 p-8 lg:col-span-2">
            <div className="flex gap-0.5" aria-label="5 étoiles" role="img">
              {Array.from({ length: featured.rating }).map((_, i) => (
                <Star key={i} className="size-4 fill-rating-star text-rating-star" />
              ))}
            </div>
            <blockquote className="font-heading mt-6 text-xl leading-snug tracking-tight text-foreground">
              &ldquo;{featured.text}&rdquo;
            </blockquote>
            <p className="mt-8 text-sm font-medium text-foreground">{featured.author}</p>
            <p className="font-num mt-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Google</p>
            <Button asChild variant="link" className="mt-8 h-auto justify-start px-0 text-primary">
              <Link href="/avis">
                Lire les avis <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </aside>
        </div>
      </section>

      {/* 6 Chiffres — bandeau inversé */}
      <section className="border-y border-border bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-primary-foreground/20">
          {[
            { v: `~${siteConfig.stats.repairMinutes} min`, l: "Intervention" },
            { v: `${siteConfig.stats.warrantyMonths} mois`, l: "Garantie" },
            { v: `${siteConfig.stats.rating}/5`, l: "Note" },
            { v: `${siteConfig.stats.reviewCount}+`, l: "Avis" },
          ].map((s) => (
            <div key={s.l} className="bg-primary px-6 py-10 sm:px-8">
              <span className="font-num text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{s.v}</span>
              <span className="mt-2 block font-num text-[10px] font-medium uppercase tracking-[0.35em] text-primary-foreground/75">
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 7 FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-section-sm sm:px-6">
        <div className="border-l-4 border-primary pl-6 sm:pl-8">
          <p className="font-num label-caps text-primary">FAQ</p>
          <h2 className="font-heading heading-section mt-4">Les questions qu&apos;on nous pose le plus.</h2>
        </div>
        <Accordion className="mt-12 w-full border-y border-border">
          {homeFaqs.map((f, i) => (
            <AccordionItem key={i} value={`h-${i}`} className="border-border">
              <AccordionTrigger className="py-5 text-left font-sans text-base font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-8">
          <Button asChild variant="outline" className="rounded-sm border-primary/50 uppercase tracking-wider">
            <Link href="/faq">
              Suite <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>

      {/* 8 CTA */}
      <section className="border-t border-border bg-muted/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2 className="font-heading heading-section text-balance">Un chiffre avant d&apos;ouvrir le capot.</h2>
            <p className="lede mt-4 text-muted-foreground">Deux minutes en ligne — ou passez sans rendez-vous pour le diagnostic.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-sm px-8 uppercase tracking-wider">
              <Link href="/devis">
                <Sparkles className="size-4" aria-hidden />
                Devis
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-sm border-primary/50 px-8 uppercase tracking-wider">
              <a href={`tel:${siteConfig.contact.phoneE164}`}>
                <Phone className="size-4" aria-hidden />
                <span className="font-num">{siteConfig.contact.phoneDisplay}</span>
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
