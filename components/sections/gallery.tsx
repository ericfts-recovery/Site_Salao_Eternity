import { site } from "@/content/site";
import { galleryImages } from "@/content/home";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Media } from "@/components/ui/media";
import { buttonStyles } from "@/components/ui/button-styles";
import { InstagramIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export function Gallery() {
  return (
    <section id="resultados" aria-labelledby="resultados-title" className="py-20 lg:py-28">
      <Container className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="resultados-title"
          title="Feito aqui"
          intro="Alguns resultados recentes. Tem muito mais no nosso Instagram."
        />
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          data-track="instagram_click"
          data-track-location="galeria"
          className={buttonStyles({ variant: "outline" }, "self-start md:self-auto")}
        >
          <InstagramIcon className="size-5" />
          {site.instagram.handle}
        </a>
      </Container>

      {/* Mobile: carrossel com scroll-snap. Desktop: grade com a coluna do meio deslocada. */}
      <Container className="mt-10">
        <ul className="-mx-4 flex snap-x snap-mandatory scrollbar-none gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-16">
          {galleryImages.map((image, index) => (
            <li
              key={image.alt}
              className={cn(
                "relative aspect-[4/5] w-[72%] shrink-0 snap-center overflow-hidden rounded-card bg-algodao sm:w-[45%] md:w-auto",
                index % 3 === 1 && "md:translate-y-16",
              )}
            >
              <Media image={image} sizes="(min-width: 768px) 33vw, 72vw" />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
