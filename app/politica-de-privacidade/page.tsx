import type { Metadata } from "next";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: `Como o ${site.name} trata seus dados pessoais, conforme a LGPD.`,
  alternates: { canonical: "/politica-de-privacidade" },
};

const LAST_UPDATE = "[DD/MM/AAAA]";

const sections = [
  {
    title: "Quem é o responsável pelos seus dados",
    body: [
      `${site.name} (${site.legalName}), ${site.address.street}, ${site.address.city} – ${site.address.state}. Contato do encarregado de dados: ${site.email}.`,
    ],
  },
  {
    title: "Quais dados coletamos",
    body: [
      "Pelo formulário de agendamento: nome, número de WhatsApp, serviço de interesse e período preferido. Não pedimos documentos nem informações de saúde.",
      "Pelos cookies de medição (só se você aceitar): dados de navegação anônimos, como páginas visitadas, tipo de aparelho e cliques em botões.",
    ],
  },
  {
    title: "Para que usamos",
    body: [
      "Os dados do formulário servem apenas para responder seu pedido e combinar o horário. A base legal é o seu consentimento, dado na hora do envio.",
      "Os dados de navegação servem para entender como o site é usado e melhorá-lo. A base legal também é o consentimento, que você pode retirar quando quiser.",
    ],
  },
  {
    title: "Com quem compartilhamos",
    body: [
      "Usamos fornecedores que processam dados em nosso nome: hospedagem do site (Vercel), envio de e-mail (Resend) e, com sua autorização, medição de audiência (Google Analytics). Não vendemos seus dados.",
      "O mapa do Google só é carregado se você clicar em “Mostrar mapa”.",
    ],
  },
  {
    title: "Por quanto tempo guardamos",
    body: [
      "Os pedidos de agendamento ficam guardados por até [12 meses] e depois são excluídos, salvo obrigação legal.",
    ],
  },
  {
    title: "Seus direitos",
    body: [
      `Pela LGPD (art. 18), você pode pedir acesso, correção, exclusão ou portabilidade dos seus dados, e revogar o consentimento a qualquer momento. Basta escrever para ${site.email} ou chamar no WhatsApp.`,
      "Para mudar sua escolha sobre cookies, use o botão “Preferências de cookies” no rodapé.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <Container className="max-w-3xl py-14 lg:py-20">
      <h1 className="text-5xl leading-[1.02] sm:text-6xl">Política de privacidade</h1>
      <p className="mt-4 text-ameixa-suave">Última atualização: {LAST_UPDATE}</p>
      <p className="mt-4 rounded-field bg-algodao-claro px-4 py-3 text-sm text-ameixa-suave">
        [REVISAR COM O CLIENTE E, SE POSSÍVEL, COM UM ADVOGADO ANTES DE PUBLICAR]
      </p>
      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-3xl">{section.title}</h2>
            <div className="mt-3 space-y-3 text-lg leading-relaxed text-ameixa-suave">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
