"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { getConsent, getServerConsent, setConsent, subscribeConsent } from "@/lib/consent";
import { buttonStyles } from "@/components/ui/button-styles";

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, getServerConsent);
  if (consent !== "unset") return null;

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-50 mx-auto max-w-xl rounded-card border border-linha bg-white p-4 shadow-[0_24px_60px_-20px_rgb(58_10_35/0.45)] md:right-auto md:bottom-6 md:left-6 md:p-5"
    >
      <p className="text-sm leading-relaxed text-ameixa md:text-[0.95rem]">
        Usamos cookies de medição para melhorar o site. Você escolhe. Detalhes na{" "}
        <Link
          href="/politica-de-privacidade"
          className="font-semibold text-framboesa underline underline-offset-4"
        >
          política de privacidade
        </Link>
        .
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setConsent("granted")}
          className={buttonStyles({}, "flex-1 px-4")}
        >
          Aceitar
        </button>
        <button
          type="button"
          onClick={() => {
            setConsent("denied");
            // Se o GA já tinha sido carregado (consentimento revogado), recarrega para descarregá-lo.
            if (typeof window.gtag === "function") window.location.reload();
          }}
          className={buttonStyles({ variant: "outline" }, "flex-1 px-4")}
        >
          Só essenciais
        </button>
      </div>
    </div>
  );
}
