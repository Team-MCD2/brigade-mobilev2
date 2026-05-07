import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone, Star } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

const services = [
  { href: "/devis", label: "Devis en ligne" },
  { href: "/services", label: "Services" },
  { href: "/reparations/apple", label: "Apple" },
  { href: "/reparations/samsung", label: "Samsung" },
  { href: "/boutique", label: "Boutique" },
];

const company = [
  { href: "/pro", label: "Entreprises" },
  { href: "/a-propos", label: "À propos" },
  { href: "/avis", label: "Avis" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const legal = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/cgv", label: "CGV" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-start gap-4">
            <span className="relative size-11 shrink-0">
              <Image
                src="/images/logo-transparent.png"
                alt={siteConfig.name}
                fill
                className="object-contain object-left"
                sizes="44px"
              />
            </span>
            <div>
              <p className="font-heading text-lg tracking-tight text-foreground">{siteConfig.name}</p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{siteConfig.tagline}</p>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-rating-star text-rating-star" />
              ))}
            </div>
            <span className="font-num font-medium text-foreground">{siteConfig.stats.rating}/5</span>
            <span>·</span>
            <span className="font-num">{siteConfig.stats.reviewCount}+ avis</span>
          </div>
        </div>

        <div className="text-sm lg:col-span-3">
          <p className="font-num text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Contact</p>
          <ul className="mt-4 space-y-3">
            <li className="flex gap-2 text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-foreground/70" aria-hidden />
              <span>
                <span className="text-foreground">{siteConfig.address.full}</span>
                <br />
                <span className="text-xs">{siteConfig.address.transit}</span>
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-foreground/70" aria-hidden />
              <a className="font-num text-foreground hover:text-primary" href={`tel:${siteConfig.contact.phoneE164}`}>
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-foreground/70" aria-hidden />
              <a className="break-all text-foreground hover:text-primary" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="flex gap-2 text-muted-foreground">
              <Clock className="mt-0.5 size-4 shrink-0 text-foreground/70" aria-hidden />
              <span>
                {siteConfig.hours.weekdays}
                <br />
                {siteConfig.hours.saturday}
              </span>
            </li>
          </ul>
        </div>

        <div className="text-sm lg:col-span-2">
          <p className="font-num text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Services</p>
          <ul className="mt-4 space-y-2">
            {services.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted-foreground hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm lg:col-span-3">
          <p className="font-num text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Entreprise</p>
          <ul className="mt-4 space-y-2">
            {company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-muted-foreground hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-2 border-t border-border pt-6">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-xs text-muted-foreground hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p>
            <a
              href="https://www.microdidact.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              {siteConfig.credit}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
