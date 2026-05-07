import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  ClipboardList,
  FileText,
  Mail,
  Phone,
  Smartphone,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Entreprises & parcs mobiles",
  description: "Contrats réparation pour TPE/PME, flottes, facturation et SLA.",
  alternates: { canonical: `${siteConfig.url}/pro` },
};

const offers = [
  {
    title: "Maintenance ponctuelle",
    desc: "TPE & indépendants — tickets à la demande, tarifs préférentiels.",
    icon: Smartphone,
    features: ["Diagnostic gratuit", "Facturation pro", `Garantie ${siteConfig.stats.warrantyMonths} mois`],
  },
  {
    title: "Flotte",
    desc: "PME 10+ appareils — SLA, prêt de matériel, reporting.",
    icon: Briefcase,
    features: ["Contrat cadre", "Pickup ou boutique", "Tarifs dégressifs"],
    highlight: true,
  },
  {
    title: "Sur site",
    desc: "Intervention terrain Toulouse — technicien dédié.",
    icon: Building2,
    features: ["Créneaux planifiés", "Kit pièces", "SLA sur mesure"],
  },
];

const steps = [
  { n: "01", title: "Brief", desc: "Parc, volumes, contraintes opérationnelles.", icon: ClipboardList },
  { n: "02", title: "Proposition", desc: "Contrat, SLA, périmètre — version écrite.", icon: FileText },
  { n: "03", title: "Go-live", desc: "Onboarding, tickets, revue mensuelle.", icon: CheckCircle2 },
];

export default function ProPage() {
  return (
    <div>
      <section className="mx-auto max-w-3xl px-4 pb-10 pt-16 text-center sm:px-6 sm:pt-24">
        <Badge variant="outline" className="rounded-full font-num text-[11px] uppercase tracking-widest">
          B2B
        </Badge>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Offre entreprises</h1>
        <p className="mt-4 text-muted-foreground">
          Flottes, points de vente, équipes terrain — nous calibrons réparation, délais et facturation.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((o) => (
            <article
              key={o.title}
              className={
                o.highlight
                  ? "relative flex flex-col rounded-2xl border-2 border-primary bg-card p-8"
                  : "flex flex-col rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-0.5 hover:border-foreground/10"
              }
            >
              {o.highlight && (
                <Badge className="absolute -top-3 left-8 rounded-full bg-primary text-primary-foreground">Recommandé</Badge>
              )}
              <o.icon className="size-8 text-primary" />
              <h2 className="mt-6 text-xl font-semibold">{o.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{o.desc}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {o.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="font-num text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Process</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Mise en place en semaines, pas en mois.</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="relative overflow-hidden rounded-2xl border border-border bg-background p-8">
                <span className="font-num pointer-events-none absolute -right-1 -top-2 text-7xl font-bold text-primary/10">
                  {s.n}
                </span>
                <s.icon className="relative size-6 text-primary" />
                <h3 className="relative mt-6 text-lg font-semibold">{s.title}</h3>
                <p className="relative mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold">Parlons de votre parc</p>
            <p className="text-sm text-muted-foreground">Réponse sous 24h ouvrées.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-lg">
              <Link href="/devis">
                <Sparkles className="size-4" />
                Devis en ligne <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-lg">
              <Link href="/contact">
                <Mail className="size-4" />
                Contact pro <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-lg">
              <a href={`tel:${siteConfig.contact.phoneE164}`}>
                <Phone className="size-4" />
                Appeler
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
