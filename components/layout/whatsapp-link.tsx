import type { ReactNode } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface WhatsAppLinkProps {
  /** Onde o clique aconteceu, para o analytics (ex.: "hero", "header"). */
  location: string;
  message?: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

/** Link de WhatsApp rastreado pelo AnalyticsListener via data-attributes (sem JS no componente). */
export function WhatsAppLink({
  location,
  message,
  className,
  children,
  ariaLabel,
}: WhatsAppLinkProps) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
      data-track="whatsapp_click"
      data-track-location={location}
    >
      {children}
    </a>
  );
}
