"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

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

import { cn } from "@/lib/utils";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/boutique", label: "Boutique" },
  { href: "/avis", label: "Avis" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

function routeIsCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const repairsOpen = pathname.startsWith("/reparations");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/90">
      <div className="mx-auto flex max-w-6xl items-stretch justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="nav-focus flex min-w-0 flex-col justify-center gap-1 py-4 sm:flex-row sm:items-center sm:gap-4 sm:py-0"
          aria-current={routeIsCurrent(pathname, "/") ? "page" : undefined}
        >
          <Image
            src="/images/logo-transparent.png"
            alt={siteConfig.name}
            width={200}
            height={48}
            sizes="(max-width: 640px) 120px, 160px"
            priority
            className="h-10 w-auto max-h-10 max-w-[140px] object-contain object-left sm:h-11 sm:max-h-11 sm:max-w-[160px]"
            style={{ maxHeight: 44, maxWidth: 160 }}
          />
          <div className="min-w-0 sm:border-l sm:border-border sm:pl-4">
            <span className="font-heading block text-lg leading-none tracking-tight text-foreground sm:text-xl">{siteConfig.name}</span>
            <span className="label-caps mt-1 block tracking-[0.35em] text-muted-foreground">{siteConfig.address.city}</span>
          </div>
        </Link>

        <nav className="hidden items-stretch lg:flex" aria-label="Principal">
          <NavigationMenu className="max-w-none">
            <NavigationMenuList className="flex h-full flex-1 items-stretch gap-0">
              <NavigationMenuItem className="flex">
                <NavigationMenuTrigger
                  className={cn(
                    "nav-focus h-auto rounded-none border-x border-transparent bg-transparent px-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground hover:bg-muted/60 hover:text-foreground data-[state=open]:border-border data-[state=open]:bg-muted/40 data-[state=open]:text-foreground",
                    repairsOpen && "text-foreground"
                  )}
                >
                  Réparations
                </NavigationMenuTrigger>
                <NavigationMenuContent className="left-0 right-auto mt-0 w-[min(100vw-2rem,28rem)] border border-border bg-popover p-0 shadow-sm">
                  <ul className="divide-y divide-border">
                    <li>
                      <NavigationMenuLink
                        render={<Link href="/reparations/apple" />}
                        className={cn(
                          "nav-focus block px-5 py-4 text-sm transition-colors hover:bg-muted/50",
                          routeIsCurrent(pathname, "/reparations/apple") && "bg-muted/40"
                        )}
                        aria-current={routeIsCurrent(pathname, "/reparations/apple") ? "page" : undefined}
                      >
                        <div className="font-heading text-base text-foreground">Apple</div>
                        <p className="mt-1 text-xs text-muted-foreground">iPhone, iPad, MacBook, iMac</p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        render={<Link href="/reparations/samsung" />}
                        className={cn(
                          "nav-focus block px-5 py-4 text-sm transition-colors hover:bg-muted/50",
                          routeIsCurrent(pathname, "/reparations/samsung") && "bg-muted/40"
                        )}
                        aria-current={routeIsCurrent(pathname, "/reparations/samsung") ? "page" : undefined}
                      >
                        <div className="font-heading text-base text-foreground">Samsung Galaxy</div>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        render={<Link href="/devis" />}
                        className={cn(
                          "nav-focus block px-5 py-4 text-sm transition-colors hover:bg-muted/50",
                          routeIsCurrent(pathname, "/devis") && "bg-muted/40"
                        )}
                        aria-current={routeIsCurrent(pathname, "/devis") ? "page" : undefined}
                      >
                        <div className="font-heading text-base text-foreground">Autre marque</div>
                        <p className="mt-1 text-xs text-muted-foreground">Devis guidé</p>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {nav.map((item) => {
                const current = routeIsCurrent(pathname, item.href);
                return (
                  <NavigationMenuItem key={item.href} className="flex">
                    <NavigationMenuLink
                      render={<Link href={item.href} />}
                      className={cn(
                        "nav-focus inline-flex items-center border-x border-transparent px-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-border hover:bg-muted/40 hover:text-foreground",
                        current && "border-border bg-muted/30 text-foreground"
                      )}
                      aria-current={current ? "page" : undefined}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="flex items-center gap-2 py-3">
          <Button asChild variant="ghost" size="icon-sm" className="hidden rounded-none md:inline-flex" aria-label="Appeler">
            <a href={`tel:${siteConfig.contact.phoneE164.replace(/\s/g, "")}`}>
              <Phone className="size-4" />
            </a>
          </Button>
          <Button asChild size="sm" className="hidden rounded-none px-5 text-xs font-semibold uppercase tracking-[0.18em] sm:inline-flex">
            <Link href="/devis">Devis</Link>
          </Button>
          <MobileNav className="lg:hidden" />
        </div>
      </div>
    </header>
  );
}
