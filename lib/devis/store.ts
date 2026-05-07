"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { DeviceCategoryId } from "@/lib/data/brands";
import type { PickupModeId } from "@/lib/data/pickupModes";
import type { RepairId } from "@/lib/data/repairs";

export interface DevisContact {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
  consent: boolean;
}

export interface DevisState {
  step: number;
  category: DeviceCategoryId | null;
  brandId: string | null;
  modelId: string | null;
  repairs: RepairId[];
  pickupMode: PickupModeId | null;
  appointmentDate: string;
  appointmentSlot: string;
  contact: DevisContact;
  setStep: (s: number) => void;
  next: () => void;
  back: () => void;
  setCategory: (c: DeviceCategoryId) => void;
  setBrand: (id: string) => void;
  setModel: (id: string) => void;
  toggleRepair: (id: RepairId) => void;
  setRepairs: (ids: RepairId[]) => void;
  setPickup: (m: PickupModeId) => void;
  setAppointment: (date: string, slot: string) => void;
  setContact: (p: Partial<DevisContact>) => void;
  reset: () => void;
}

const initialContact: DevisContact = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  notes: "",
  consent: false,
};

export const useDevisStore = create<DevisState>()(
  persist(
    (set, get) => ({
      step: 0,
      category: null,
      brandId: null,
      modelId: null,
      repairs: [],
      pickupMode: null,
      appointmentDate: "",
      appointmentSlot: "",
      contact: { ...initialContact },
      setStep: (s) => set({ step: s }),
      next: () => set({ step: Math.min(get().step + 1, 7) }),
      back: () => set({ step: Math.max(get().step - 1, 0) }),
      setCategory: (c) =>
        set({
          category: c,
          brandId: null,
          modelId: null,
          repairs: [],
        }),
      setBrand: (id) => set({ brandId: id, modelId: null }),
      setModel: (id) => set({ modelId: id }),
      toggleRepair: (id) => {
        const cur = get().repairs;
        if (cur.includes(id)) {
          set({ repairs: cur.filter((x) => x !== id) });
        } else {
          set({ repairs: [...cur, id] });
        }
      },
      setRepairs: (ids) => set({ repairs: ids }),
      setPickup: (m) => set({ pickupMode: m }),
      setAppointment: (date, slot) => set({ appointmentDate: date, appointmentSlot: slot }),
      setContact: (p) => set({ contact: { ...get().contact, ...p } }),
      reset: () =>
        set({
          step: 0,
          category: null,
          brandId: null,
          modelId: null,
          repairs: [],
          pickupMode: null,
          appointmentDate: "",
          appointmentSlot: "",
          contact: { ...initialContact },
        }),
    }),
    { name: "brigade-devis-v3" },
  ),
);
