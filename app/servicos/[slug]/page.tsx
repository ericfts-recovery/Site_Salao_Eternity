import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { getCategoryLabel, getServiceBySlug, services } from "@/content/services";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/structured-data";
import { serviceWhatsAppMessage } from "@/lib/whatsapp";
import { JsonLd } from "@/components/ui/json-ld";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button-styles";
import { CheckIcon, WhatsAppIcon } from "@/components/ui/icons";
import { InfinityMark } from "@/components/ui/infinity";
import { WhatsAppLink } from "@/components/layout/whatsapp-link";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = `${service.name} em ${site.address.city}`;
  const description = `${service.summary} Agende no ${site.name} pelo WhatsApp.`;
  const path = `/servicos/${service.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { title, description },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = services
    .filter((item) => item.category === service.category && item.slug !== service.slug)
    .slice(0, 3);
  const path = `/servicos/${service.slug}`;

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Início", path: "/" },
          { name: "Serviços", path: "/#servicos" },
          { name: service.name, path },
        ])}
      />

      <article className="relative overflow-hidden pt-8 pb-20 lg:pt-12 lg:pb-28">
        <InfinityMark
          className="pointer-events-none absolute top-10 -right-32 w-[30rem] text-algodao/70"
          strokeWidth={28}
        />
        <Container className="relative">
          <nav aria-label="Trilha de navegação" className="text-sm text-ameixa-suave">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="inline-flex min-h-11 items-center hover:text-framboesa">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/#servicos"
                  className="inline-flex min-h-11 items-center hover:text-framboesa"
                >
                  {getCategoryLabel(service.category)}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ameixa">
                {service.name}
              </li>
            </ol>
          </nav>

          <div className="mt-6 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div>
              <h1 className="text-[3rem] leading-[0.98] sm:text-7xl">
                {service.name} em {site.address.city}
              </h1>
              <p className="mt-6 max-w-xl text-xl text-ameixa-suave">{service.summary}</p>
              <div className="mt-8 max-w-xl space-y-4 text-lg leading-relaxed">
                {service.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <aside className="self-start rounded-card bg-white p-7 shadow-[0_30px_60px_-30px_rgb(58_10_35/0.35)] lg:sticky lg:top-28">
              <h2 className="font-sans text-lg font-semibold">O que está incluso</h2>
              <ul className="mt-4 space-y-3">
                {service.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <CheckIcon className="mt-0.5 size-5 shrink-0 text-framboesa" />
                    {highlight}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-linha pt-5 font-semibold text-framboesa">
                {service.price ?? "Valor sob consulta"}
              </p>
              <WhatsAppLink
                location={`servico_${service.slug}`}
                message={serviceWhatsAppMessage(service.name)}
                className={buttonStyles({ size: "lg" }, "mt-5 w-full")}
              >
                <WhatsAppIcon className="size-5" />
                Agendar pelo WhatsApp
              </WhatsAppLink>
            </aside>
          </div>

          {related.length > 0 && (
            <section aria-labelledby="relacionados-title" className="mt-20">
              <h2 id="relacionados-title" className="text-4xl">
                Combina com
              </h2>
              <ul className="mt-6 border-t border-linha">
                {related.map((item) => (
                  <li key={item.slug} className="border-b border-linha">
                    <Link
                      href={`/servicos/${item.slug}`}
                      className="group flex min-h-16 flex-col justify-center gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between"
                    >
                      <span className="font-display text-2xl group-hover:text-framboesa">
                        {item.name}
                      </span>
                      <span className="text-ameixa-suave">{item.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </Container>
      </article>
    </>
  );
}
