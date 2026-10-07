import { serviceCategories, services } from "@/content/services";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonStyles } from "@/components/ui/button-styles";
import { WhatsAppIcon } from "@/components/ui/icons";
import { WhatsAppLink } from "@/components/layout/whatsapp-link";
import { ServiceTabs } from "@/components/sections/service-tabs";

export function ServicesSection() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeading
          id="servicos-title"
          title="O que a gente faz"
          intro="Escolha uma categoria. Os valores variam com comprimento e técnica, então confirmamos tudo antes de começar."
        />
        <ServiceTabs categories={serviceCategories} services={services} />
        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <WhatsAppLink location="servicos" className={buttonStyles({ size: "lg" })}>
            <WhatsAppIcon className="size-5" />
            Pedir orçamento no WhatsApp
          </WhatsAppLink>
          <p className="text-ameixa-suave">Mande uma foto de referência que a gente te orienta.</p>
        </div>
      </Container>
    </section>
  );
}
