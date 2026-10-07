"use client";

import { setConsent } from "@/lib/consent";

export function ManageCookiesButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => setConsent("unset")} className={className}>
      Preferências de cookies
    </button>
  );
}
