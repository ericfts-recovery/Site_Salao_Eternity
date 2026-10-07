export type AnalyticsEvent =
  | "whatsapp_click"
  | "phone_click"
  | "instagram_click"
  | "cta_click"
  | "map_load"
  | "booking_submit"
  | "booking_success"
  | "booking_error";

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Envia eventos para o GA4 (quando carregado após consentimento).
 * Sem consentimento, o gtag não existe e nada é enviado.
 */
export function trackEvent(name: AnalyticsEvent, params: EventParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
