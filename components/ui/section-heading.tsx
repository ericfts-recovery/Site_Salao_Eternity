import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  id: string;
  title: string;
  intro?: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  id,
  title,
  intro,
  tone = "dark",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2
        id={id}
        className={cn(
          "text-[2.5rem] leading-[1.02] sm:text-5xl lg:text-6xl",
          tone === "dark" ? "text-ameixa" : "text-white",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-4 max-w-xl text-lg",
            tone === "dark" ? "text-ameixa-suave" : "text-white/85",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
