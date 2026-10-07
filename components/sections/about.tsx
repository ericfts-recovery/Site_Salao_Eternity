import { about, aboutImage } from "@/content/home";
import { Container } from "@/components/ui/container";
import { Media } from "@/components/ui/media";

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="bg-white py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Topo em arco: ecoa a curva do laço do logo */}
        <div className="relative mx-auto aspect-[9/11] w-full max-w-md overflow-hidden rounded-t-[999px] rounded-b-card bg-algodao lg:order-last">
          <Media image={aboutImage} sizes="(min-width: 1024px) 28rem, 90vw" />
        </div>

        <div>
          <h2 id="sobre-title" className="text-[2.5rem] leading-[1.02] sm:text-5xl lg:text-6xl">
            {about.title}
          </h2>
          <div className="mt-6 space-y-4 text-lg text-ameixa-suave">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-linha pt-8">
            {about.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col">
                <dt className="text-sm text-ameixa-suave">{fact.label}</dt>
                <dd className="order-first font-display text-3xl text-framboesa sm:text-5xl">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
