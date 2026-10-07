import { site } from "@/content/site";
import { hero, heroImages } from "@/content/home";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button-styles";
import { StarIcon, WhatsAppIcon } from "@/components/ui/icons";
import { WhatsAppLink } from "@/components/layout/whatsapp-link";
import { InfinityPortrait } from "@/components/sections/infinity-portrait";

function RatingBadge() {
  if (!site.rating) return null;
  const { value, count, sourceLabel, url } = site.rating;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center gap-2.5 rounded-pill bg-white px-4 py-2 text-sm text-ameixa shadow-[0_12px_30px_-14px_rgb(58_10_35/0.4)] transition-shadow hover:shadow-[0_16px_36px_-14px_rgb(58_10_35/0.55)]"
    >
      <span className="flex text-chiclete" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <StarIcon key={index} className="size-4" />
        ))}
      </span>
      <span>
        <strong className="font-semibold">{value}</strong> com {count} {sourceLabel}
      </span>
    </a>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="overflow-hidden pt-10 pb-16 sm:pt-14 lg:pt-20 lg:pb-24"
    >
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-8">
        <div>
          <h1
            id="hero-title"
            className="text-[3.25rem] leading-[0.95] text-ameixa sm:text-7xl lg:text-[4.75rem] xl:text-[5.75rem]"
          >
            {hero.title}
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg text-ameixa-suave sm:text-xl">
            Salão de beleza em {site.address.city}. {hero.lead}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsAppLink location="hero" className={buttonStyles({ size: "lg" })}>
              <WhatsAppIcon className="size-5" />
              Agendar pelo WhatsApp
            </WhatsAppLink>
            <a
              href="#servicos"
              data-track="cta_click"
              data-track-location="hero_servicos"
              className={buttonStyles({ variant: "outline", size: "lg" })}
            >
              Ver serviços
            </a>
          </div>
        </div>

        <div className="relative">
          <InfinityPortrait images={heroImages} />
          <div className="mt-2 flex justify-center lg:-mt-4">
            <RatingBadge />
          </div>
        </div>
      </Container>
    </section>
  );
}
