"use client";

import * as React from "react";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";

import { submitContact } from "@/app/contact/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site-config";

export function ContactForm() {
  const [pending, startTransition] = React.useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    startTransition(async () => {
      const r = await submitContact(payload);
      if (!r.ok) toast.error(r.error);
      else toast.success("Message envoyé.");
    });
  }

  return (
    <div>
      <section className="mx-auto max-w-3xl px-4 pb-10 pt-16 text-center sm:px-6 sm:pt-24">
        <Badge variant="outline" className="rounded-full font-num text-[11px] uppercase tracking-widest">
          Contact
        </Badge>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Écrire à l&apos;atelier</h1>
        <p className="mt-4 text-muted-foreground">Réponse sous 24h ouvrées — pour l&apos;urgence, téléphone.</p>
        <p className="mx-auto mt-6 max-w-lg rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          Pour un prix indicatif immédiat (toutes marques et catégories), passez par le{" "}
          <Link href="/devis" className="font-medium text-primary underline underline-offset-2 hover:no-underline">
            devis en ligne
          </Link>
          .
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
        <div className="space-y-4">
          {[
            {
              Icon: Phone,
              label: "Téléphone",
              node: (
                <a className="font-num font-medium text-foreground hover:text-primary" href={`tel:${siteConfig.contact.phoneE164}`}>
                  {siteConfig.contact.phoneDisplay}
                </a>
              ),
            },
            {
              Icon: Mail,
              label: "Email",
              node: (
                <a className="break-all text-foreground hover:text-primary" href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              ),
            },
            {
              Icon: MapPin,
              label: "Adresse",
              node: <span className="text-muted-foreground">{siteConfig.address.full}</span>,
            },
            {
              Icon: Clock,
              label: "Horaires",
              node: (
                <span className="text-muted-foreground">
                  {siteConfig.hours.weekdays}
                  <br />
                  {siteConfig.hours.saturday}
                </span>
              ),
            },
          ].map((row) => (
            <div key={row.label} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
              <row.Icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <div>
                <p className="font-num text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{row.label}</p>
                <div className="mt-1 text-sm">{row.node}</div>
              </div>
            </div>
          ))}
        </div>

        <Card className="rounded-2xl border-border shadow-none">
          <CardHeader>
            <CardTitle>Message</CardTitle>
            <CardDescription>Formulaire sécurisé — pas de spam, engagements clairs.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={onSubmit}>
              <div>
                <Label htmlFor="name">Nom</Label>
                <Input id="name" name="name" required className="mt-2 rounded-lg" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" required className="mt-2 rounded-lg" />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" name="phone" required className="mt-2 rounded-lg" />
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" required rows={6} className="mt-2 rounded-lg" />
              </div>
              <Button type="submit" disabled={pending} className="rounded-lg">
                <Send className="size-4" />
                {pending ? "Envoi…" : "Envoyer"}
              </Button>
              <p className="text-xs text-muted-foreground">
                <a href="/confidentialite" className="underline underline-offset-4 hover:text-foreground">
                  Politique de confidentialité
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
