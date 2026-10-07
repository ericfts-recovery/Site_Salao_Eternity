import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "outline" | "light";
type ButtonSize = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-pill font-semibold transition-[background-color,color,box-shadow,transform] duration-300 ease-suave active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-framboesa text-white shadow-[0_10px_30px_-12px_rgb(176_18_79/0.7)] hover:bg-framboesa-escura",
  outline: "border-2 border-ameixa/15 text-ameixa hover:border-framboesa hover:text-framboesa",
  light: "bg-white text-framboesa hover:bg-algodao-claro",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-12 px-6 text-base",
  lg: "min-h-14 px-7 text-[1.0625rem]",
};

export function buttonStyles(
  { variant = "primary", size = "md" }: { variant?: ButtonVariant; size?: ButtonSize } = {},
  className?: string,
): string {
  return cn(base, variants[variant], sizes[size], className);
}
