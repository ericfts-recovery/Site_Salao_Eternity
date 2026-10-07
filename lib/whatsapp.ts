import { site } from "@/content/site";

export function buildWhatsAppUrl(message: string = site.whatsapp.defaultMessage): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function serviceWhatsAppMessage(serviceName: string): string {
  return `Oi! Vim pelo site do Salão Eternity e quero agendar: ${serviceName}.`;
}
