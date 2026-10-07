import { faq } from "@/content/home";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PlusIcon } from "@/components/ui/icons";

export function FaqSection() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="py-20 lg:py-28">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <SectionHeading
          id="duvidas-title"
          title="Dúvidas frequentes"
          intro="Não achou o que procurava? Chama no WhatsApp que a gente responde."
        />
        <div className="border-t border-linha">
          {faq.map((item) => (
            <details key={item.question} className="group border-b border-linha">
              <summary className="faq-summary flex min-h-16 cursor-pointer items-center justify-between gap-6 py-5 text-lg font-semibold text-ameixa">
                {item.question}
                <PlusIcon className="size-6 shrink-0 text-framboesa transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="pr-10 pb-6 text-ameixa-suave">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
