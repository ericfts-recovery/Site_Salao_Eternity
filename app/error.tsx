"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button-styles";
import { WhatsAppIcon } from "@/components/ui/icons";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app] Erro na página:", error.digest ?? error.message);
  }, [error]);

  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center py-20">
      <h1 className="text-5xl leading-[1.02] sm:text-7xl">Esta página não carregou</h1>
      <p className="mt-4 max-w-md text-lg text-ameixa-suave">
        Tente de novo. Se continuar, chame a gente no WhatsApp que agendamos por lá.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={reset} className={buttonStyles({ size: "lg" })}>
          Tentar de novo
        </button>
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles({ variant: "outline", size: "lg" })}
        >
          <WhatsAppIcon className="size-5" />
          Chamar no WhatsApp
        </a>
      </div>
    </Container>
  );
}
