import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="font-num text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Page introuvable</h1>
      <p className="mt-3 max-w-md text-muted-foreground">La ressource n&apos;existe pas ou a été déplacée.</p>
      <Button asChild className="mt-8 rounded-lg">
        <Link href="/">Retour accueil</Link>
      </Button>
    </div>
  );
}
