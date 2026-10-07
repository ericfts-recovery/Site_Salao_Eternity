import { testimonials } from "@/content/home";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="depoimentos-title" className="bg-algodao py-20 lg:py-28">
      <Container>
        <SectionHeading id="depoimentos-title" title="Quem vem, volta" />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <li key={`${testimonial.author}-${index}`}>
              <figure className="flex h-full flex-col rounded-card bg-white p-7">
                <span
                  aria-hidden="true"
                  className="font-display text-7xl leading-[0.6] text-chiclete"
                >
                  “
                </span>
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-ameixa">
                  <p>{testimonial.quote}</p>
                </blockquote>
                <figcaption className="mt-6 border-t border-linha pt-4">
                  <span className="block font-semibold text-ameixa">{testimonial.author}</span>
                  <span className="text-sm text-ameixa-suave">{testimonial.service}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
