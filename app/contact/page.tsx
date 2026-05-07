import type { Metadata } from "next";

import { ContactForm } from "@/app/contact/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: `${siteConfig.url}/contact` },
};

export default function ContactPage() {
  return <ContactForm />;
}
