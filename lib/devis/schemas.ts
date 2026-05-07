import { z } from "zod";

import { DEVICE_CATEGORIES } from "@/lib/data/brands";
import { PICKUP_MODES } from "@/lib/data/pickupModes";
import { REPAIR_IDS } from "@/lib/data/repairs";

const categorySchema = z.enum(DEVICE_CATEGORIES);
const pickupSchema = z.enum(PICKUP_MODES);
const repairSchema = z.array(z.enum(REPAIR_IDS)).min(1, "Sélectionnez au moins une panne");

export const contactSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Téléphone requis"),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  notes: z.string().optional(),
  consent: z.boolean().refine((v) => v === true, { message: "Vous devez accepter le traitement des données" }),
});

export const quoteSubmitSchema = z.object({
  category: categorySchema,
  brandId: z.string().min(1),
  modelId: z.string().min(1),
  repairs: repairSchema,
  pickupMode: pickupSchema,
  appointmentDate: z.string().min(1, "Choisissez une date"),
  appointmentSlot: z.string().optional(),
  contact: contactSchema,
});

export type QuoteSubmitInput = z.infer<typeof quoteSubmitSchema>;
