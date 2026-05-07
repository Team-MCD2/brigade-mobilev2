import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  alternates: { canonical: `${siteConfig.url}/confidentialite` },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-4xl font-bold tracking-tight">Confidentialité</h1>
      <p className="mt-6 text-muted-foreground">
        Les données collectées (devis, contact) servent uniquement à traiter votre demande. À tout moment, demandez leur
        suppression à {siteConfig.contact.email}.
      </p>
      <p className="mt-4 text-muted-foreground">
        Hébergement conforme aux standards de sécurité courants ; pas de revente de données.
      </p>
      <p className="mt-8 text-sm">
        <Link href="/devis" className="font-medium text-primary underline underline-offset-4 hover:no-underline">
          Faire un devis en ligne
        </Link>
      </p>
    </article>
  );
}
