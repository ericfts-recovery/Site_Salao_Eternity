import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { InfinityMark } from "@/components/ui/infinity";

interface LogoProps {
  className?: string;
  tone?: "dark" | "light";
}

export function Logo({ className, tone = "dark" }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, página inicial`}
      className={cn("inline-flex min-h-11 items-center gap-2", className)}
    >
      <InfinityMark className={cn("h-4 w-8", tone === "dark" ? "text-chiclete" : "text-algodao")} />
      <span
        className={cn(
          "font-display text-[1.65rem] leading-none",
          tone === "dark" ? "text-ameixa" : "text-white",
        )}
      >
        Eternity
      </span>
    </Link>
  );
}
