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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GOOGLE_REVIEWS } from "@/lib/data/googleReviews";
import { siteConfig } from "@/lib/site-config";

const brands = [
  { name: "Apple", href: "/reparations/apple" },
  { name: "Samsung", href: "/reparations/samsung" },
  { name: "Huawei", href: "/reparations/huawei" },
  { name: "Xiaomi", href: "/reparations/xiaomi" },
  { name: "Google", href: "/reparations/google" },
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
      {/* 1 Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.07)_1px,transparent_0)] [background-size:20px_20px]"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:py-32">
          <Badge variant="outline" className="rounded-full px-3 py-1 font-num text-[11px] uppercase tracking-widest">
            Atelier · {siteConfig.address.city}
          </Badge>
          <h1 className="mt-8 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
            Un devis lisible.
            <br />
            <span className="text-muted-foreground">Une réparation qui tient la route.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Devis guidé en ligne, diagnostic gratuit en boutique, garantie{" "}
            <span className="font-num text-foreground">{siteConfig.stats.warrantyMonths} mois</span>. Un parcours simple,
            pensé comme un logiciel — sans jargon inutile.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-lg px-6">
              <Link href="/devis">
                <Sparkles className="size-4" aria-hidden />
                Obtenir mon devis
                <ArrowRight className="size-4 opacity-70" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-lg px-6">
              <Link href="/boutique">
                <MapPin className="size-4" aria-hidden />
                Boutique
              </Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <span className="flex" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-rating-star text-rating-star" />
                ))}
              </span>
              <span className="font-num font-medium text-foreground">{siteConfig.stats.rating}/5</span>
              <span>· {siteConfig.stats.reviewCount}+ avis</span>
            </span>
            <span className="font-num text-xs uppercase tracking-wider">{siteConfig.address.transit}</span>
          </div>
        </div>
      </section>

      {/* 2 Brands */}
      <section className="border-b border-border bg-muted/40 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4 sm:px-6">
          {brands.map((b) => (
            <Link
              key={b.name}
              href={b.href}
              className="font-num text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {b.name}
            </Link>
          ))}
          <Link
            href="/devis"
            className="font-num text-sm font-medium uppercase tracking-[0.2em] text-primary hover:underline"
          >
            Autre →
          </Link>
        </div>
      </section>

      {/* 3 Services — liste éditoriale (pas bento / pastilles bleues) */}
      <section className="border-y border-border bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start">
            <div>
              <p className="font-num text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Périmètre
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                Ce qu&apos;on répare, sans catalogue gadget.
              </h2>
              <p className="mt-5 max-w-md text-muted-foreground">
                Pas de pastilles colorées ni de grille «&nbsp;app store&nbsp;» — juste des lignes claires vers les fiches utiles.
              </p>
              <Link
                href="/services"
                className="mt-8 inline-flex items-center gap-2 font-num text-sm font-medium text-foreground underline decoration-foreground/30 underline-offset-8 hover:decoration-foreground"
              >
                Index complet des services
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>

            <nav className="flex flex-col border-t border-border lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0" aria-label="Services phares">
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
                  className="group grid grid-cols-[auto_1fr_auto] gap-x-5 gap-y-1 border-b border-border py-6 first:border-t-0 lg:first:border-t lg:pt-0"
                >
                  <span className="font-num text-xs font-medium tabular-nums text-muted-foreground">{row.code}</span>
                  <div className="min-w-0">
                    <p className="font-semibold tracking-tight text-foreground group-hover:underline group-hover:decoration-foreground/25 group-hover:underline-offset-4">
                      {row.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{row.desc}</p>
                  </div>
                  <ArrowRight
                    className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                    aria-hidden
                  />
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {/* 4 Process */}
      <section className="border-y border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-num text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Parcours</p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">Trois étapes, aucune zone grise.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "Vous décrivez",
                desc: "Devis en ligne ou passage boutique — même logique, même transparence.",
                Icon: MessageSquare,
              },
              {
                n: "02",
                title: "On diagnostique",
                desc: "Gratuit, sous vos yeux — prix ferme avant toute intervention.",
                Icon: Search,
              },
              {
                n: "03",
                title: "On répare",
                desc: `Souvent ~${siteConfig.stats.repairMinutes} min · garantie ${siteConfig.stats.warrantyMonths} mois.`,
                Icon: ShieldCheck,
              },
            ].map((step) => (
              <div
                key={step.n}
                className="relative overflow-hidden rounded-xl border border-border bg-background p-8 transition-shadow hover:shadow-sm"
              >
                <span className="font-num pointer-events-none absolute -right-1 -top-2 text-7xl font-bold text-primary/10">
                  {step.n}
                </span>
                <step.Icon className="relative size-6 text-primary" aria-hidden />
                <h3 className="relative mt-6 text-lg font-semibold">{step.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Why + testimonial */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <p className="font-num text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Pourquoi nous
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">L&apos;agilité d&apos;un atelier local, la rigueur d&apos;un produit SaaS.</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                { t: "Rapide", d: `Interventions courantes en ~${siteConfig.stats.repairMinutes} min.`, Icon: Clock },
                { t: "Transparent", d: "Prix indicatif en ligne, diagnostic gratuit pour figer le montant.", Icon: CheckCircle2 },
                { t: "Garanti", d: `${siteConfig.stats.warrantyMonths} mois pièces & main d'œuvre.`, Icon: Shield },
                { t: "Polyvalent", d: "MacBook, PC, tablettes — voir la page Services.", Icon: Laptop },
              ].map((b) => (
                <div
                  key={b.t}
                  className="rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-foreground/10"
                >
                  <b.Icon className="size-5 text-primary" aria-hidden />
                  <p className="mt-3 font-semibold">{b.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
                </div>
              ))}
            </div>
          </div>
          <aside className="flex flex-col justify-between rounded-xl border border-border bg-muted/40 p-8">
            <div>
              <div className="flex gap-0.5" aria-label="5 étoiles" role="img">
                {Array.from({ length: featured.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-rating-star text-rating-star" />
                ))}
              </div>
              <blockquote className="mt-5 text-base leading-relaxed text-foreground">&ldquo;{featured.text}&rdquo;</blockquote>
              <p className="mt-6 text-sm font-medium">{featured.author}</p>
              <p className="font-num text-xs uppercase tracking-wider text-muted-foreground">Avis Google</p>
            </div>
            <Button asChild variant="link" className="mt-8 h-auto justify-start px-0 text-primary">
              <Link href="/avis">
                Tous les avis <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          </aside>
        </div>
      </section>

      {/* 6 Stats */}
      <section className="border-y border-border bg-background">
        <div className="mx-auto grid max-w-6xl divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {[
            { v: `~${siteConfig.stats.repairMinutes} min`, l: "Réparation express" },
            { v: `${siteConfig.stats.warrantyMonths} mois`, l: "Garantie" },
            { v: `${siteConfig.stats.rating}/5`, l: "Note Google" },
            { v: `${siteConfig.stats.reviewCount}+`, l: "Retours clients" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col items-center px-6 py-8 text-center">
              <span className="font-num text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{s.v}</span>
              <span className="mt-2 font-num text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 7 FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <p className="text-center font-num text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          FAQ
        </p>
        <h2 className="mt-3 text-center text-3xl font-bold tracking-tight sm:text-4xl">Réponses courtes, impact direct.</h2>
        <Accordion className="mt-10 w-full divide-y divide-border border-y border-border">
          {homeFaqs.map((f, i) => (
            <AccordionItem key={i} value={`h-${i}`} className="border-0">
              <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="rounded-lg">
            <Link href="/faq">
              Toute la FAQ <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Button>
        </div>
      </section>

      {/* 8 CTA */}
      <section className="border-t border-border bg-primary/[0.05]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left">
          <div className="max-w-xl">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Prêt à clarifier le coût de votre réparation&nbsp;?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Le devis prend moins de deux minutes — ou passez directement en boutique.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="rounded-lg px-6">
              <Link href="/devis">
                <Sparkles className="size-4" aria-hidden />
                Devis
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-lg px-6">
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
