import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: `${siteConfig.url}/mentions-legales` },
};

export default function LegalPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-4xl font-bold tracking-tight">Mentions légales</h1>
      <p className="mt-6">
        <strong>{siteConfig.name}</strong>
        <br />
        {siteConfig.address.full}
      </p>
      <p className="mt-4 text-muted-foreground">
        Tél. {siteConfig.contact.phoneDisplay} — {siteConfig.contact.email}
      </p>
      <p className="mt-4 text-muted-foreground">Directeur de publication : à compléter.</p>
      <p className="mt-4 text-muted-foreground">
        Hébergeur : Vercel Inc. — <a href="https://vercel.com/legal" className="underline underline-offset-4">vercel.com/legal</a>
      </p>
      <p className="mt-6 text-sm text-muted-foreground">
        Crédit réalisation :{" "}
        <a href="https://www.microdidact.com" className="underline underline-offset-4">
          Microdidact
        </a>
        .
      </p>
    </article>
  );
}
