export type ServiceCategoryId = "cabelo" | "unhas" | "olhar" | "make";

export interface ServiceCategory {
  id: ServiceCategoryId;
  label: string;
}

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategoryId;
  /** Uma linha para o cardápio de serviços. */
  summary: string;
  /** Parágrafos da página do serviço (SEO local). */
  description: string[];
  /** O que está incluso / como funciona. */
  highlights: string[];
  /** Ex.: "A partir de R$ 120". Sem valor, o site mostra "Valor sob consulta". */
  price?: string;
}

export interface ImageAsset {
  /** Caminho em /public. Sem src, o site exibe um espaço reservado com a descrição. */
  src?: string;
  alt: string;
  width: number;
  height: number;
}

export interface Testimonial {
  quote: string;
  author: string;
  service: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface OpeningHours {
  /** Dias no formato schema.org: Mo, Tu, We, Th, Fr, Sa, Su */
  days: Array<"Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su">;
  label: string;
  opens: string;
  closes: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  instagram: { handle: string; url: string };
  whatsapp: { number: string; defaultMessage: string };
  phone: { display: string; e164: string };
  email: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    mapsUrl: string;
    mapsEmbedUrl: string;
    geo?: { latitude: number; longitude: number };
  };
  hours: OpeningHours[];
  rating?: { value: string; count: string; sourceLabel: string; url: string };
  keywords: string[];
}
