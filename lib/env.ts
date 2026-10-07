const FALLBACK_SITE_URL = "http://localhost:3000";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_SITE_URL).replace(/\/$/, "");

export const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "";

export function absoluteUrl(path = "/"): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
