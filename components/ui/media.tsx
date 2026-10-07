import Image from "next/image";
import type { ImageAsset } from "@/types/content";
import { cn } from "@/lib/cn";
import { InfinityMark } from "@/components/ui/infinity";

interface MediaProps {
  image: ImageAsset;
  /** Atributo sizes do next/image; obrigatório para não baixar imagem maior que o necessário. */
  sizes: string;
  priority?: boolean;
  className?: string;
}

const PLACEHOLDER_PREFIX = /^\[FOTO\]\s*/;

/**
 * Preenche o elemento pai (que deve ter tamanho/aspect-ratio definido, evitando CLS).
 * Sem `src`, mostra um espaço reservado na identidade visual, com a descrição da foto.
 */
export function Media({ image, sizes, priority = false, className }: MediaProps) {
  if (image.src) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  const caption = image.alt.replace(PLACEHOLDER_PREFIX, "");

  return (
    <div
      role="img"
      aria-label={caption}
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden bg-[radial-gradient(120%_90%_at_30%_20%,#fff_0%,var(--color-algodao-claro)_40%,var(--color-algodao)_100%)] p-6 text-center",
        className,
      )}
    >
      <InfinityMark className="w-1/3 max-w-24 text-chiclete/35" strokeWidth={22} />
      <span className="max-w-[22ch] text-sm leading-snug text-ameixa-suave">{caption}</span>
    </div>
  );
}
