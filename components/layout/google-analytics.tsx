"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { getConsent, getServerConsent, subscribeConsent } from "@/lib/consent";
import { gaId } from "@/lib/env";

/** GA4 só é carregado depois que a visitante aceita os cookies (LGPD). */
export function GoogleAnalytics() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, getServerConsent);
  if (!gaId || consent !== "granted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
