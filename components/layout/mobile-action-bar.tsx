import Link from "next/link";
import { buttonStyles } from "@/components/ui/button-styles";
import { WhatsAppIcon } from "@/components/ui/icons";
import { WhatsAppLink } from "@/components/layout/whatsapp-link";

/** Mobile: barra fixa com as duas ações. Desktop: botão flutuante de WhatsApp. */
export function MobileActionBar() {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-linha bg-leite/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-md gap-3">
          <Link
            href="/#agendar"
            data-track="cta_click"
            data-track-location="mobile_bar"
            className={buttonStyles({ variant: "outline" }, "flex-1 bg-white")}
          >
            Pedir horário
          </Link>
          <WhatsAppLink location="mobile_bar" className={buttonStyles({}, "flex-1")}>
            <WhatsAppIcon className="size-5" />
            WhatsApp
          </WhatsAppLink>
        </div>
      </div>

      <WhatsAppLink
        location="floating"
        ariaLabel="Agendar pelo WhatsApp"
        className="fixed right-6 bottom-6 z-40 hidden size-16 items-center justify-center rounded-pill bg-framboesa text-white shadow-[0_16px_40px_-12px_rgb(176_18_79/0.8)] transition-transform duration-300 ease-suave hover:scale-105 md:inline-flex"
      >
        <WhatsAppIcon className="size-7" />
      </WhatsAppLink>
    </>
  );
}
