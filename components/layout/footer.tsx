import Link from "next/link";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { InfinityMark } from "@/components/ui/infinity";
import { InstagramIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { WhatsAppLink } from "@/components/layout/whatsapp-link";
import { ManageCookiesButton } from "@/components/layout/manage-cookies-button";

const linkClass =
  "inline-flex min-h-11 items-center text-white/80 transition-colors hover:text-white";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ameixa pt-16 pb-28 text-white md:pb-12">
      <InfinityMark
        className="pointer-events-none absolute -top-10 -right-24 w-[34rem] text-white/[0.04]"
        strokeWidth={40}
      />
      <Container className="relative grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-white/75">{site.tagline}.</p>
          <address className="mt-6 leading-relaxed text-white/80 not-italic">
            {site.address.street}, {site.address.neighborhood}
            <br />
            {site.address.city} – {site.address.state}, {site.address.postalCode}
          </address>
        </div>

        <div>
          <h2 className="font-sans text-base font-semibold text-algodao">Serviços</h2>
          <ul className="mt-3 grid grid-cols-1 gap-x-6 sm:grid-cols-2 md:grid-cols-1">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link href={`/servicos/${service.slug}`} className={linkClass}>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-base font-semibold text-algodao">Fale com a gente</h2>
          <ul className="mt-3">
            <li>
              <WhatsAppLink location="footer" className={`${linkClass} gap-2`}>
                <WhatsAppIcon className="size-5" />
                WhatsApp
              </WhatsAppLink>
            </li>
            <li>
              <a
                href={`tel:${site.phone.e164}`}
                data-track="phone_click"
                data-track-location="footer"
                className={`${linkClass} gap-2`}
              >
                <PhoneIcon className="size-5" />
                {site.phone.display}
              </a>
            </li>
            <li>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                data-track="instagram_click"
                data-track-location="footer"
                className={`${linkClass} gap-2`}
              >
                <InstagramIcon className="size-5" />
                {site.instagram.handle}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="relative mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. {site.legalName}.
        </p>
        <div className="flex flex-wrap gap-x-6">
          <Link
            href="/politica-de-privacidade"
            className="inline-flex min-h-11 items-center hover:text-white"
          >
            Política de privacidade
          </Link>
          <ManageCookiesButton className="inline-flex min-h-11 items-center hover:text-white" />
        </div>
      </Container>
    </footer>
  );
}
