"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

const TRACKABLE_EVENTS: ReadonlySet<string> = new Set<AnalyticsEvent>([
  "whatsapp_click",
  "phone_click",
  "instagram_click",
  "cta_click",
]);

/**
 * Um único listener global: qualquer elemento com data-track="evento" é rastreado.
 * Assim os botões continuam Server Components, sem JS próprio.
 */
export function AnalyticsListener() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("[data-track]") : null;
      if (!(target instanceof HTMLElement)) return;
      const name = target.dataset.track;
      if (!name || !TRACKABLE_EVENTS.has(name)) return;
      trackEvent(name as AnalyticsEvent, { location: target.dataset.trackLocation });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
