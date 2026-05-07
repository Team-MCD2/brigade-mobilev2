"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Phone, Sparkles } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const pages = [
  { href: "/", label: "Accueil" },
  { href: "/devis", label: "Devis en ligne" },
  { href: "/services", label: "Services" },
  { href: "/reparations/apple", label: "Réparation Apple" },
  { href: "/reparations/samsung", label: "Réparation Samsung" },
  { href: "/boutique", label: "Boutique" },
  { href: "/pro", label: "Entreprises" },
  { href: "/avis", label: "Avis" },
  { href: "/faq", label: "FAQ" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

const legal = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/cgv", label: "CGV" },
];

export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(
          "inline-flex size-9 shrink-0 items-center justify-center rounded-sm border border-border bg-card text-foreground transition-colors hover:bg-muted",
          className,
        )}
        aria-label="Ouvrir le menu"
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col gap-0 border-l border-border bg-popover">
        <SheetHeader className="text-left">
          <SheetTitle className="font-heading text-xl font-normal tracking-tight text-foreground">{siteConfig.name}</SheetTitle>
          <p className="font-num text-[10px] uppercase tracking-[0.35em] text-muted-foreground">{siteConfig.address.city}</p>
        </SheetHeader>
        <div className="mt-6 space-y-2">
          <Link
            href="/devis"
            onClick={() => setOpen(false)}
            className="flex h-11 items-center justify-center gap-2 rounded-sm bg-primary text-sm font-semibold uppercase tracking-wider text-primary-foreground"
          >
            <Sparkles className="size-4" aria-hidden />
            Devis en ligne
          </Link>
          <a
            href={`tel:${siteConfig.contact.phoneE164.replace(/\s/g, "")}`}
            onClick={() => setOpen(false)}
            className="flex h-11 items-center justify-center gap-2 rounded-sm border border-border bg-card text-sm font-medium"
          >
            <Phone className="size-4" aria-hidden />
            {siteConfig.contact.phoneDisplay}
          </a>
        </div>
        <nav className="mt-8 flex-1 space-y-6 overflow-y-auto">
          <div>
            <p className="font-num mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Pages
            </p>
            <ul className="space-y-0.5">
              {pages.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-sm px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-num mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Légal
            </p>
            <ul className="space-y-0.5">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-sm px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
