import type { ImageAsset } from "@/types/content";
import { Media } from "@/components/ui/media";
import { INFINITY_PATH } from "@/components/ui/infinity";

interface InfinityPortraitProps {
  images: [ImageAsset, ImageAsset];
}

/*
 * Duas fotos circulares dentro dos laços do ∞ (viewBox 400x200).
 * Círculos de raio 72 centrados em (104,100) e (296,100) → 36% x 72% do quadro.
 */
const circleBase =
  "absolute top-[14%] aspect-square w-[36%] overflow-hidden rounded-full bg-algodao ring-[6px] ring-white motion-safe:animate-surgir";

export function InfinityPortrait({ images }: InfinityPortraitProps) {
  const [left, right] = images;

  return (
    <div className="relative aspect-[2/1] w-full">
      <div className={`${circleBase} left-[8%]`}>
        <Media image={left} sizes="(min-width: 1024px) 22vw, 40vw" priority />
      </div>
      <div className={`${circleBase} left-[56%] [animation-delay:150ms]`}>
        <Media image={right} sizes="(min-width: 1024px) 22vw, 40vw" priority />
      </div>

      <svg
        viewBox="0 0 400 200"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
      >
        <path
          d={INFINITY_PATH}
          stroke="var(--color-algodao)"
          strokeWidth={10}
          strokeLinejoin="round"
        />
        <path
          d={INFINITY_PATH}
          pathLength={1}
          stroke="var(--color-chiclete)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1"
          className="motion-safe:animate-desenhar"
        />
      </svg>
    </div>
  );
}
