import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, Sparkles } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions fréquentes sur la réparation, la garantie, les données et le devis en ligne.",
  alternates: { canonical: `${siteConfig.url}/faq` },
};

const faqs = [
  {
    q: "Le prix du devis en ligne est-il garanti ?",
    a: "Non — il est indicatif (« à partir de »), aligné sur les tarifs marché des réparateurs indépendants. Le prix définitif est confirmé après notre diagnostic gratuit en boutique.",
  },
  {
    q: "Le diagnostic est-il vraiment gratuit ?",
    a: "Oui, sans engagement et sans frais cachés. Vous repartez avec un devis clair même si vous décidez de ne pas faire la réparation.",
  },
  {
    q: "Combien de temps prend une réparation ?",
    a: `En moyenne ${siteConfig.stats.repairMinutes} minutes pour les interventions courantes en boutique (écran, batterie, connecteur), souvent le jour même. Pour les pièces à commander ou les pannes complexes (Mac, oxydation), nous vous donnons un délai précis dès le diagnostic.`,
  },
  {
    q: "Quelle garantie sur les réparations ?",
    a: `${siteConfig.stats.warrantyMonths} mois pièces et main d'œuvre sur toutes les réparations réalisées par nos techniciens, sur présentation du ticket. Si un même symptôme revient pendant la période, on reprend l'appareil sans frais.`,
  },
  {
    q: "Quelles marques réparez-vous ?",
    a: "Apple (iPhone, iPad, MacBook, iMac), Samsung Galaxy (S, Note, A, Z Fold/Flip), Huawei, Xiaomi, Google Pixel, OnePlus, Sony, Microsoft Surface, Asus — et la plupart des autres marques sur devis.",
  },
  {
    q: "Faites-vous les MacBook, iMac et PC ?",
    a: "Oui — écran, clavier, batterie, connectique, ventilation, pâte thermique, problèmes logiciels, restauration macOS / Windows. Devis détaillé après diagnostic, possibilité de dépôt prolongé pour les interventions lourdes.",
  },
  {
    q: "Mon téléphone est tombé dans l'eau, que faire ?",
    a: "Éteignez-le immédiatement, ne tentez pas de le recharger, et apportez-le-nous au plus vite. Plus le délai est court, meilleures sont les chances de désoxydation. Nous démontons, nettoyons, séchons et testons l'appareil — avec sauvegarde des données quand c'est possible.",
  },
  {
    q: "Mes données personnelles sont-elles préservées ?",
    a: "Nous recommandons toujours une sauvegarde avant toute intervention. Pour les remplacements simples (écran, batterie), les données restent intactes. En cas de panne logicielle ou de carte mère, nous vous expliquons les risques avant de commencer.",
  },
  {
    q: "Quels moyens de paiement acceptez-vous ?",
    a: "Carte bancaire (CB, Visa, Mastercard), paiement sans contact, Apple Pay / Google Pay, espèces. Le paiement se fait en boutique au moment de récupérer l'appareil réparé.",
  },
  {
    q: "Pouvez-vous venir chercher l'appareil à domicile ?",
    a: "Oui — nous proposons un retrait à domicile sur Toulouse intra-rocade et la métropole toulousaine (avec supplément). L'envoi postal est aussi possible : nous vous fournissons l'étiquette et les instructions après validation du devis.",
  },
  {
    q: "Que se passe-t-il si la réparation échoue ou s'avère impossible ?",
    a: "Si la réparation n'est pas possible (carte mère trop endommagée, par exemple), aucun frais n'est facturé hormis les éventuelles pièces consommées qui auraient été commandées avec votre accord explicite. Nous vous proposons toujours une alternative claire.",
  },
  {
    q: "Faites-vous des devis pour entreprises ?",
    a: "Oui, nous proposons des contrats cadres pour les flottes de smartphones et ordinateurs : tarifs préférentiels, prêt d'appareils de remplacement, facturation mensuelle. Voir la page Entreprises ou nous contacter directement.",
  },
];

export default function FaqPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div>
      <JsonLd data={ld} />
      <section className="mx-auto max-w-3xl px-4 pb-10 pt-16 text-center sm:px-6 sm:pt-24">
        <Badge variant="outline" className="rounded-full font-num text-[11px] uppercase tracking-widest">
          Support
        </Badge>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl">FAQ</h1>
        <p className="mt-4 text-pretty text-muted-foreground">
          Tout ce qu&apos;il faut savoir avant de nous confier votre appareil.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <Accordion className="w-full divide-y divide-border border-y border-border">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`q-${i}`} className="border-0">
              <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section className="border-t border-border bg-primary/[0.05] py-14">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:px-6 lg:flex-row lg:justify-between">
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Encore une question&nbsp;?</h2>
            <p className="mt-2 text-muted-foreground">Appelez ou lancez un devis — réponse rapide.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild className="rounded-lg">
              <Link href="/devis">
                <Sparkles className="size-4" aria-hidden />
                Devis <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-lg">
              <a href={`tel:${siteConfig.contact.phoneE164}`}>
                <Phone className="size-4" aria-hidden />
                {siteConfig.contact.phoneDisplay}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
