"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { buttonStyles } from "@/components/ui/button-styles";
import { MapPinIcon } from "@/components/ui/icons";

/**
 * O mapa só carrega com um clique: o iframe do Google instala cookies de terceiros
 * (LGPD) e pesa ~1 MB, o que derrubaria a performance da página.
 */
export function LocationMap() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card bg-algodao md:aspect-auto md:h-full md:min-h-80">
      {loaded ? (
        <iframe
          src={site.address.mapsEmbedUrl}
          title={`Mapa com a localização do ${site.name}`}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <MapPinIcon className="size-10 text-framboesa" />
          <p className="max-w-xs text-ameixa-suave">
            O mapa é do Google e só carrega se você quiser.
          </p>
          <button
            type="button"
            onClick={() => {
              setLoaded(true);
              trackEvent("map_load");
            }}
            className={buttonStyles({ variant: "outline" }, "bg-white")}
          >
            Mostrar mapa
          </button>
        </div>
      )}
    </div>
  );
}
