import Image from "next/image";
import Link from "next/link";
import { Keyboard, Phone, Sparkles } from "lucide-react";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { siteConfig } from "@/lib/site-config";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/boutique", label: "Boutique" },
  { href: "/avis", label: "Avis" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:h-[4.25rem] sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="relative size-11 shrink-0 sm:size-12">
            <Image
              src="/images/logo-transparent.png"
              alt={siteConfig.name}
              fill
              className="object-contain"
              sizes="48px"
              priority
            />
          </span>
          <span className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold tracking-tight text-foreground">{siteConfig.name}</span>
            <span className="font-num text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Toulouse</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm text-muted-foreground hover:bg-transparent hover:text-foreground data-[state=open]:bg-transparent data-[state=open]:text-foreground">
                  Réparations
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-0.5 p-2 sm:w-[400px] sm:grid-cols-2">
                    <li className="col-span-2">
                      <NavigationMenuLink
                        render={<Link href="/reparations/apple" />}
                        className="block rounded-md p-3 text-sm font-medium transition-colors hover:bg-muted"
                      >
                        <div className="font-semibold">Apple</div>
                        <p className="mt-0.5 text-xs text-muted-foreground">iPhone, iPad, MacBook, iMac</p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        render={<Link href="/reparations/samsung" />}
                        className="block rounded-md p-3 text-sm transition-colors hover:bg-muted"
                      >
                        <div className="font-medium">Samsung Galaxy</div>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        render={<Link href="/devis" />}
                        className="block rounded-md p-3 text-sm transition-colors hover:bg-muted"
                      >
                        <div className="font-medium">Autre marque</div>
                        <p className="mt-0.5 text-xs text-muted-foreground">Devis guidé</p>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {nav.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    render={<Link href={item.href} />}
                    className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <span
            className="ml-2 hidden items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground xl:inline-flex"
            aria-hidden
          >
            <Keyboard className="size-3 opacity-60" />
            <span className="font-num">⌘K</span>
          </span>
        </nav>

        <div className="flex items-center gap-1.5">
          <Button asChild variant="ghost" size="icon-sm" className="hidden md:inline-flex" aria-label="Appeler">
            <a href={`tel:${siteConfig.contact.phoneE164.replace(/\s/g, "")}`}>
              <Phone className="size-4" />
            </a>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/devis">
              <Sparkles className="size-4" />
              Devis
            </Link>
          </Button>
          <MobileNav className="lg:hidden" />
        </div>
      </div>
    </header>
  );
}
