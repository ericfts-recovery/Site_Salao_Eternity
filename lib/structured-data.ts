import { site } from "@/content/site";
import type { FaqItem, Service } from "@/types/content";
import { absoluteUrl } from "@/lib/env";

const BUSINESS_ID = absoluteUrl("/#salao");

/*
 * Não incluímos aggregateRating: o Google ignora avaliações "autodeclaradas"
 * de LocalBusiness e isso pode gerar ação manual. As estrelas vêm do Google Meu Negócio.
 */
export function beautySalonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": BUSINESS_ID,
    name: site.name,
    description: site.description,
    url: absoluteUrl("/"),
    image: absoluteUrl("/opengraph-image"),
    logo: absoluteUrl("/icon.svg"),
    telephone: site.phone.e164,
    email: site.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: "BR",
    },
    ...(site.address.geo && {
      geo: { "@type": "GeoCoordinates", ...site.address.geo },
    }),
    hasMap: site.address.mapsUrl,
    openingHoursSpecification: site.hours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days.map((day) => DAY_NAMES[day]),
      opens: slot.opens,
      closes: slot.closes,
    })),
    sameAs: [site.instagram.url],
  };
}

const DAY_NAMES = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
} as const;

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    serviceType: service.name,
    url: absoluteUrl(`/servicos/${service.slug}`),
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: site.address.city },
  };
}
