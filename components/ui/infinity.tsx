import type { SVGProps } from "react";

/** Laço do infinito (viewBox 0 0 400 200). Os dois laços orbitam os centros (104,100) e (296,100). */
export const INFINITY_PATH =
  "M200 100C230 55 255 12 296 12C346 12 384 52 384 100C384 148 346 188 296 188C255 188 230 145 200 100C170 55 145 12 104 12C54 12 16 52 16 100C16 148 54 188 104 188C145 188 170 145 200 100Z";

export function InfinityMark({
  strokeWidth = 34,
  ...props
}: SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 400 200" fill="none" aria-hidden="true" {...props}>
      <path
        d={INFINITY_PATH}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}
