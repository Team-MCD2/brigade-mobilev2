"use server";

import { z } from "zod";

import { siteConfig } from "@/lib/site-config";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  message: z.string().min(10),
});

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function submitContact(raw: unknown): Promise<{ ok: true } | { ok: false; error: string }> {
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "Formulaire incomplet" };
  const d = parsed.data;
  const html = `<p>${escapeHtml(d.name)} — ${escapeHtml(d.email)} — ${escapeHtml(d.phone)}</p><p>${escapeHtml(d.message)}</p>`;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL ?? siteConfig.contact.email;
  if (apiKey) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? "La Brigade Mobile <onboarding@resend.dev>",
        to: [to],
        reply_to: d.email,
        subject: `[Contact] ${d.name}`,
        html,
      }),
    });
  } else {
    console.info("[submitContact] RESEND_API_KEY manquant", d);
  }
  return { ok: true };
}
