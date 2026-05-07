"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { submitQuote } from "@/app/devis/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BRANDS, DEVICE_CATEGORY_LABELS, DEVICE_CATEGORIES, type BrandId } from "@/lib/data/brands";
import { getModelsByBrand, MODELS } from "@/lib/data/models";
import { PICKUP_MODE_META, PICKUP_MODES, type PickupModeId } from "@/lib/data/pickupModes";
import { computeQuoteTotal } from "@/lib/data/repairCatalog";
import { REPAIR_IDS, REPAIR_LABELS, type RepairId } from "@/lib/data/repairs";
import { useDevisStore } from "@/lib/devis/store";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const STEPS = 8;

const STEP_TITLES = [
  "Catégorie",
  "Marque",
  "Modèle",
  "Pannes",
  "Prise en charge",
  "Créneau",
  "Coordonnées",
  "Récapitulatif",
] as const;

const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

export function QuoteWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const s = useDevisStore();
  const reducedMotion = useReducedMotion();
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setReady(true);
    const model = searchParams.get("model");
    const repairs = searchParams.get("repairs");
    if (model) {
      const m = MODELS.find((x) => x.id === model);
      if (m) {
        s.setBrand(m.brandId);
        s.setCategory(m.category);
        s.setModel(m.id);
        s.setStep(3);
      } else {
        s.setModel(model);
        s.setStep(3);
      }
    }
    if (repairs) {
      const list = repairs.split(",").filter((x): x is RepairId => (REPAIR_IDS as readonly string[]).includes(x));
      if (list.length) s.setRepairs(list);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- bootstrap once from URL
  }, []);

  const category = s.category;
  const quote =
    category && s.pickupMode
      ? computeQuoteTotal({
          modelId: s.modelId === "unknown" ? null : s.modelId,
          category,
          repairs: s.repairs,
          pickup: s.pickupMode,
        })
      : null;

  const progress = ((s.step + 1) / STEPS) * 100;

  async function onSubmit() {
    if (!category || !s.brandId || !s.modelId || !s.pickupMode || !s.appointmentDate) {
      toast.error("Complétez toutes les étapes");
      return;
    }
    const payload = {
      category,
      brandId: s.brandId,
      modelId: s.modelId,
      repairs: s.repairs,
      pickupMode: s.pickupMode,
      appointmentDate: s.appointmentDate,
      appointmentSlot: s.appointmentSlot,
      contact: s.contact,
    };
    const res = await submitQuote(payload);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    if (typeof window !== "undefined") {
      sessionStorage.setItem(
        `quote-${res.ref}`,
        JSON.stringify({
          ...payload,
          total: quote?.total,
        }),
      );
    }
    toast.success("Devis envoyé !");
    s.reset();
    router.push(`/devis/confirmation/${res.ref}`);
  }

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-center text-muted-foreground">Chargement du devis…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-14">
      <div className="mb-10 text-center">
        <p className="font-num text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {String(s.step + 1).padStart(2, "0")} / {String(STEPS).padStart(2, "0")} — {STEP_TITLES[s.step]}
        </p>
        <Badge variant="outline" className="mt-5 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide">
          <Sparkles className="mr-1 size-3" aria-hidden />
          Devis instantané
        </Badge>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.5rem]">
          Réparation claire, prix à partager
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Appareil → panne → mode (boutique, domicile, postal) → créneau → récap avec total indicatif.
        </p>
        <Progress value={progress} className="mt-8" />
        <p className="mt-2 font-num text-xs text-muted-foreground">
          Montants <strong className="text-foreground">à partir de</strong> — figés après diagnostic gratuit.
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={s.step}
          initial={reducedMotion ? false : { opacity: 0, x: 12 }}
          animate={reducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
        >
          {s.step === 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">1. Type d&apos;appareil</CardTitle>
                <CardDescription>Choisissez la catégorie la plus proche.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {DEVICE_CATEGORIES.map((c) => {
                  const active = s.category === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        s.setCategory(c);
                        s.next();
                      }}
                      className={cn(
                        "rounded-lg border bg-card p-4 text-left transition-all",
                        "hover:-translate-y-0.5 hover:border-foreground/15 hover:bg-muted/30",
                        active ? "border-primary bg-primary/5 shadow-sm" : "border-border",
                      )}
                    >
                      <p className="text-base font-semibold">{DEVICE_CATEGORY_LABELS[c].title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{DEVICE_CATEGORY_LABELS[c].description}</p>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {s.step === 1 && category && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">2. Marque</CardTitle>
                <CardDescription>Marques les plus demandées — autre marque en fin de liste.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {BRANDS.filter((b) => b.categories.includes(category)).map((b) => {
                  const active = s.brandId === b.id;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        s.setBrand(b.id);
                        s.next();
                      }}
                      className={cn(
                        "rounded-lg border bg-card p-4 text-center text-sm font-medium transition-all",
                        "hover:-translate-y-0.5 hover:border-foreground/15 hover:bg-muted/30",
                        active ? "border-primary bg-primary/5 shadow-sm" : "border-border",
                      )}
                    >
                      {b.name}
                    </button>
                  );
                })}
              </CardContent>
              <CardFooter className="justify-between">
                <Button type="button" variant="outline" onClick={s.back}>
                  <ArrowLeft className="size-4" /> Retour
                </Button>
              </CardFooter>
            </Card>
          )}

          {s.step === 2 && category && s.brandId && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">3. Modèle</CardTitle>
                <CardDescription>Sélectionnez votre modèle ou indiquez qu&apos;il n&apos;est pas listé.</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[360px] pr-3 sm:h-[420px]">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {getModelsByBrand(s.brandId as BrandId, category).map((m) => {
                      const active = s.modelId === m.id;
                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            s.setModel(m.id);
                            s.next();
                          }}
                          className={cn(
                            "rounded-md border bg-card px-3 py-2 text-left text-sm font-medium transition-all",
                            "hover:-translate-y-0.5 hover:border-foreground/15 hover:bg-muted/30",
                            active ? "border-primary bg-primary/5 shadow-sm" : "border-border",
                          )}
                        >
                          {m.name}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => {
                        s.setModel("unknown");
                        s.next();
                      }}
                      className={cn(
                        "rounded-md border border-dashed bg-muted/40 px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/40",
                        s.modelId === "unknown" ? "border-primary text-primary" : "border-border",
                      )}
                    >
                      Mon modèle n&apos;est pas listé — tarif moyen catégorie
                    </button>
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="justify-between">
                <Button type="button" variant="outline" onClick={s.back}>
                  <ArrowLeft className="size-4" /> Retour
                </Button>
              </CardFooter>
            </Card>
          )}

          {s.step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">4. Panne(s)</CardTitle>
                <CardDescription>Cochez tout ce qui correspond — plusieurs choix possibles.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {REPAIR_IDS.map((id) => {
                  const active = s.repairs.includes(id);
                  return (
                    <label
                      key={id}
                      className={cn(
                        "flex cursor-pointer items-start gap-3 rounded-md border bg-card p-3 transition-all",
                        "hover:-translate-y-0.5 hover:border-foreground/15",
                        active ? "border-primary bg-primary/5 shadow-sm" : "border-border",
                      )}
                    >
                      <Checkbox checked={active} onCheckedChange={() => s.toggleRepair(id)} />
                      <span>
                        <span className="text-sm font-medium">{REPAIR_LABELS[id].label}</span>
                        <span className="mt-1 block text-xs text-muted-foreground">{REPAIR_LABELS[id].description}</span>
                      </span>
                    </label>
                  );
                })}
                <div className="sm:col-span-2">
                  <Label htmlFor="notes">Précisions (optionnel)</Label>
                  <Textarea
                    id="notes"
                    className="mt-1"
                    value={s.contact.notes}
                    onChange={(e) => s.setContact({ notes: e.target.value })}
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button type="button" variant="outline" onClick={s.back}>
                  <ArrowLeft className="size-4" /> Retour
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    if (!s.repairs.length) {
                      toast.error("Choisissez au moins une panne");
                      return;
                    }
                    s.next();
                  }}
                >
                  Continuer <ArrowRight className="size-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {s.step === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">5. Mode de prise en charge</CardTitle>
                <CardDescription>Boutique, domicile ou envoi postal — choisissez la formule qui vous arrange.</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={s.pickupMode ?? ""}
                  onValueChange={(v) => s.setPickup(v as PickupModeId)}
                  className="grid gap-3"
                >
                  {PICKUP_MODES.map((id) => {
                    const active = s.pickupMode === id;
                    return (
                      <label
                        key={id}
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-md border bg-card p-4 transition-all",
                          "hover:-translate-y-0.5 hover:border-foreground/15",
                          active ? "border-primary bg-primary/5 shadow-sm" : "border-border",
                        )}
                      >
                        <RadioGroupItem value={id} id={id} />
                        <span>
                          <span className="text-base font-semibold">{PICKUP_MODE_META[id].title}</span>
                          <span className="mt-1 block text-sm text-muted-foreground">{PICKUP_MODE_META[id].description}</span>
                          <span className="mt-2 inline-block text-xs font-medium text-primary">
                            +{PICKUP_MODE_META[id].priceEuro} € · {PICKUP_MODE_META[id].durationHint}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </RadioGroup>
              </CardContent>
              <CardFooter className="justify-between">
                <Button type="button" variant="outline" onClick={s.back}>
                  <ArrowLeft className="size-4" /> Retour
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    if (!s.pickupMode) {
                      toast.error("Choisissez un mode");
                      return;
                    }
                    s.next();
                  }}
                >
                  Continuer <ArrowRight className="size-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {s.step === 5 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">6. Date & créneau</CardTitle>
                <CardDescription>
                  {s.pickupMode === "postal"
                    ? "Date souhaitée d’envoi / réception — nous vous recontactons avec l’étiquette."
                    : "Choisissez un créneau boutique ou une fenêtre pour le retrait à domicile."}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-2">
                <div>
                  <Label>Date</Label>
                  <Calendar
                    mode="single"
                    selected={s.appointmentDate ? new Date(s.appointmentDate) : undefined}
                    onSelect={(d) => {
                      if (d) s.setAppointment(d.toISOString().slice(0, 10), s.appointmentSlot);
                    }}
                    className="mt-2 rounded-md border p-2"
                  />
                </div>
                <div>
                  <Label>Créneau horaire</Label>
                  <Select
                    value={s.appointmentSlot}
                    onValueChange={(v) => s.setAppointment(s.appointmentDate, v ?? "")}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Choisir une heure" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="justify-between">
                <Button type="button" variant="outline" onClick={s.back}>
                  <ArrowLeft className="size-4" /> Retour
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    if (!s.appointmentDate || !s.appointmentSlot) {
                      toast.error("Choisissez date et créneau");
                      return;
                    }
                    s.next();
                  }}
                >
                  Continuer <ArrowRight className="size-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {s.step === 6 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">7. Vos coordonnées</CardTitle>
                <CardDescription>Pour confirmer le RDV / envoi — données RGPD.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    className="mt-1"
                    value={s.contact.name}
                    onChange={(e) => s.setContact({ name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="mt-1"
                    value={s.contact.email}
                    onChange={(e) => s.setContact({ email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    className="mt-1"
                    value={s.contact.phone}
                    onChange={(e) => s.setContact({ phone: e.target.value })}
                  />
                </div>
                {(s.pickupMode === "domicile_intra" || s.pickupMode === "domicile_metro" || s.pickupMode === "postal") && (
                  <>
                    <div className="sm:col-span-2">
                      <Label htmlFor="addr">Adresse</Label>
                      <Input
                        id="addr"
                        className="mt-1"
                        value={s.contact.address}
                        onChange={(e) => s.setContact({ address: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cp">Code postal</Label>
                      <Input
                        id="cp"
                        className="mt-1"
                        value={s.contact.postalCode}
                        onChange={(e) => s.setContact({ postalCode: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Ville</Label>
                      <Input
                        id="city"
                        className="mt-1"
                        value={s.contact.city}
                        onChange={(e) => s.setContact({ city: e.target.value })}
                      />
                    </div>
                  </>
                )}
                <label className="flex cursor-pointer items-start gap-3 sm:col-span-2">
                  <Checkbox
                    checked={s.contact.consent}
                    onCheckedChange={(v) => s.setContact({ consent: Boolean(v) })}
                  />
                  <span className="text-sm text-muted-foreground">
                    J&apos;accepte que mes données soient utilisées pour traiter ma demande (contact / devis), conformément à la{" "}
                    <Link href="/confidentialite" className="underline underline-offset-4 hover:text-foreground">
                      politique de confidentialité
                    </Link>
                    .
                  </span>
                </label>
              </CardContent>
              <CardFooter className="justify-between">
                <Button type="button" variant="outline" onClick={s.back}>
                  <ArrowLeft className="size-4" /> Retour
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    const { name, email, phone, consent } = s.contact;
                    if (!name || !email || !phone) {
                      toast.error("Remplissez nom, email et téléphone");
                      return;
                    }
                    if (!consent) {
                      toast.error("Acceptez le traitement des données");
                      return;
                    }
                    s.next();
                  }}
                >
                  Voir le récap <ArrowRight className="size-4" />
                </Button>
              </CardFooter>
            </Card>
          )}

          {s.step === 7 && category && quote && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">8. Récapitulatif & prix</CardTitle>
                <CardDescription>Total indicatif TTC — diagnostic gratuit en boutique pour figer le prix.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="rounded-lg border border-primary/30 bg-primary/5 p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">À partir de</p>
                  <p className="font-num mt-1 text-4xl font-bold tracking-tight text-foreground tabular-nums">{quote.total} €</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Pièces + main d&apos;œuvre + option {PICKUP_MODE_META[s.pickupMode!].title} (+{quote.pickupFee} €)
                  </p>
                </div>
                <ul className="space-y-2 text-sm">
                  {quote.lines.map((l) => (
                    <li key={l.id} className="flex justify-between border-b border-dashed border-border pb-2">
                      <span className="text-muted-foreground">{l.label}</span>
                      <span className="font-medium">{l.price} €</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-start gap-3 rounded-md border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span>
                    Garantie {siteConfig.stats.warrantyMonths} mois · réparation express ~{siteConfig.stats.repairMinutes} min en
                    boutique · {siteConfig.stats.rating}/5 ({siteConfig.stats.reviewCount}+ avis).
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={s.back}>
                  <ArrowLeft className="size-4" /> Modifier
                </Button>
                <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap">
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href={`tel:${siteConfig.contact.phoneE164}`}>Appeler</a>
                  </Button>
                  <Button type="button" className="w-full sm:w-auto" onClick={onSubmit}>
                    Confirmer le devis
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
