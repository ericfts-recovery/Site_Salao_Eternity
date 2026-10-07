/**
 * Dados do salão. TUDO que está entre [COLCHETES] é placeholder e precisa ser
 * confirmado com o cliente antes de publicar.
 */
import type { SiteConfig } from "@/types/content";

export const site: SiteConfig = {
  name: "Salão Eternity",
  legalName: "[RAZÃO SOCIAL LTDA]",
  tagline: "Beleza que fica com você",
  description:
    "Salão de beleza em [CIDADE]: corte, coloração, mechas, unhas, sobrancelha, cílios e make. Agende pelo WhatsApp em poucos segundos.",
  instagram: {
    handle: "@salao_eternity",
    url: "https://www.instagram.com/salao_eternity/",
  },
  whatsapp: {
    // Somente dígitos, com DDI e DDD. Ex.: 5551999999999
    number: "5500000000000",
    defaultMessage: "Oi! Vim pelo site do Salão Eternity e quero agendar um horário.",
  },
  phone: {
    display: "[(00) 00000-0000]",
    e164: "+5500000000000",
  },
  email: "[contato@salaoeternity.com.br]",
  address: {
    street: "[Rua Exemplo, 123]",
    neighborhood: "[Bairro]",
    city: "[CIDADE]",
    state: "[UF]",
    postalCode: "[00000-000]",
    // Link do perfil no Google Meu Negócio
    mapsUrl: "https://maps.google.com/?q=Sal%C3%A3o+Eternity",
    // Google Maps > Compartilhar > Incorporar um mapa > copiar só a URL do src
    mapsEmbedUrl: "https://www.google.com/maps?q=Sal%C3%A3o+Eternity&output=embed",
  },
  // [CONFIRMAR HORÁRIOS] — valores de exemplo; o formato HH:MM alimenta o JSON-LD.
  hours: [
    { days: ["Tu", "We", "Th", "Fr"], label: "[Terça a sexta]", opens: "09:00", closes: "19:00" },
    { days: ["Sa"], label: "[Sábado]", opens: "08:00", closes: "17:00" },
  ],
  // Preencher com a nota real do Google. Sem este bloco, o selo some do site.
  rating: {
    value: "[4,9]",
    count: "[000]",
    sourceLabel: "avaliações no Google",
    url: "https://maps.google.com/?q=Sal%C3%A3o+Eternity",
  },
  keywords: [
    "salão de beleza em [CIDADE]",
    "mechas loiras [CIDADE]",
    "manicure [CIDADE]",
    "design de sobrancelha [CIDADE]",
    "maquiagem para festa [CIDADE]",
  ],
};

export const navLinks = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#resultados", label: "Resultados" },
  { href: "/#sobre", label: "O salão" },
  { href: "/#duvidas", label: "Dúvidas" },
] as const;
