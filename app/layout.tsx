import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/env";
import { beautySalonJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/ui/json-ld";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { GoogleAnalytics } from "@/components/layout/google-analytics";
import { AnalyticsListener } from "@/components/layout/analytics-listener";
import { bricolage, gloock } from "./fonts";
import "./globals.css";

const defaultTitle = `${site.name} | Salão de beleza em ${site.address.city}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: defaultTitle, template: `%s | ${site.name}` },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#fff7fa",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${gloock.variable} ${bricolage.variable}`}>
      <body>
        <a
          href="#conteudo"
          className="sr-only z-50 rounded-pill bg-framboesa px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Pular para o conteúdo
        </a>
        <JsonLd data={beautySalonJsonLd()} />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <MobileActionBar />
        <CookieConsent />
        <AnalyticsListener />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
