import { siteConfig } from "@/lib/site-config";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MobilePhoneStore",
    name: siteConfig.name,
    alternateName: siteConfig.legacyTradeName,
    image: `${siteConfig.url}/images/logo-transparent.png`,
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneE164,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "18:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.stats.rating,
      reviewCount: siteConfig.stats.reviewCount,
    },
    priceRange: "€€",
    areaServed: { "@type": "City", name: "Toulouse" },
    sameAs: [siteConfig.social.googleMaps, siteConfig.social.instagram, siteConfig.social.facebook].filter(Boolean),
  };
}
