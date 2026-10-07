import localFont from "next/font/local";

// Fontes auto-hospedadas (sem requisição ao Google no carregamento da página).
export const gloock = localFont({
  src: "./fonts/gloock-latin-400.woff2",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-gloock",
  fallback: ["Times New Roman", "serif"],
});

export const bricolage = localFont({
  src: "./fonts/bricolage-grotesque-latin-wght.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-bricolage",
  fallback: ["system-ui", "sans-serif"],
});
