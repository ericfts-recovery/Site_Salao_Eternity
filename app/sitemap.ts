import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    ...services.map((service) => ({
      url: absoluteUrl(`/servicos/${service.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: absoluteUrl("/politica-de-privacidade"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
