/**
 * [CONFIRMAR COM O SALÃO] lista de serviços e preços. Sem `price`, o site mostra
 * "Valor sob consulta".
 */
import type { Service, ServiceCategory } from "@/types/content";

export const serviceCategories: ServiceCategory[] = [
  { id: "cabelo", label: "Cabelo" },
  { id: "unhas", label: "Unhas" },
  { id: "olhar", label: "Sobrancelha e cílios" },
  { id: "make", label: "Make e eventos" },
];

export const services: Service[] = [
  {
    slug: "corte-feminino",
    name: "Corte feminino",
    category: "cabelo",
    summary: "Do repicado ao long bob, pensado pro seu rosto e pra sua rotina.",
    description: [
      "Antes de cortar, a gente conversa: como você arruma o cabelo no dia a dia, quanto tempo tem de manhã e o que você não quer de jeito nenhum.",
      "O corte é finalizado no salão, e você sai sabendo como repetir o resultado em casa.",
    ],
    highlights: [
      "Conversa de diagnóstico",
      "Lavagem com produtos profissionais",
      "Finalização inclusa",
    ],
  },
  {
    slug: "mechas-e-luzes",
    name: "Mechas e luzes",
    category: "cabelo",
    summary: "Loiro iluminado, morena iluminada ou contorno no rosto, com cuidado com o fio.",
    description: [
      "Mechas pedem técnica e paciência. Avaliamos a saúde do fio antes de clarear e escolhemos a técnica que chega no tom que você quer com o menor dano possível.",
      "Quando o loiro dos sonhos precisa de mais de uma sessão, a gente explica o porquê e monta o plano com você.",
    ],
    highlights: [
      "Avaliação do fio antes de clarear",
      "Tonalização",
      "Tratamento de reconstrução no processo",
    ],
  },
  {
    slug: "coloracao",
    name: "Coloração",
    category: "cabelo",
    summary: "Cobertura de brancos, mudança de cor ou só um brilho a mais.",
    description: [
      "Da raiz retocada à cor nova, escolhemos o tom olhando sua pele, seus olhos e o quanto você quer de manutenção.",
    ],
    highlights: [
      "Teste de mecha quando necessário",
      "Escolha de tom personalizada",
      "Finalização inclusa",
    ],
  },
  {
    slug: "tratamentos-capilares",
    name: "Tratamentos capilares",
    category: "cabelo",
    summary: "Hidratação, nutrição e reconstrução para o fio voltar a ter vida.",
    description: [
      "Cada cabelo pede uma coisa. Fazemos um diagnóstico rápido e indicamos o tratamento certo, ou um cronograma, se fizer sentido para você.",
    ],
    highlights: ["Diagnóstico do fio", "Escova ou finalização", "Indicação de cuidados em casa"],
  },
  {
    slug: "escova-e-penteados",
    name: "Escova e penteados",
    category: "cabelo",
    summary: "Escova modelada, ondas e penteados para festa, formatura ou aquele date.",
    description: [
      "Da escova lisa às ondas soltas, deixamos o cabelo pronto para fotos e para durar a noite inteira.",
    ],
    highlights: ["Escova modelada", "Babyliss e ondas", "Penteados para eventos"],
  },
  {
    slug: "manicure-e-pedicure",
    name: "Manicure e pedicure",
    category: "unhas",
    summary: "Cutilagem caprichada e esmaltação que dura.",
    description: [
      "Material esterilizado, cutilagem cuidadosa e a cor que você escolher. Simples assim, bem feito.",
    ],
    highlights: ["Material esterilizado", "Cutilagem e esmaltação", "Pés e mãos"],
  },
  {
    slug: "unhas-em-gel",
    name: "Alongamento e unhas em gel",
    category: "unhas",
    summary: "Formato, comprimento e nail art do seu jeito.",
    description: [
      "Alongamento em gel e esmaltação em gel com acabamento fino. Leve sua referência ou crie com a gente.",
    ],
    highlights: ["Alongamento em gel", "Esmaltação em gel", "Nail art"],
  },
  {
    slug: "design-de-sobrancelhas",
    name: "Design de sobrancelhas",
    category: "olhar",
    summary: "Desenho que respeita o seu rosto, com ou sem henna.",
    description: [
      "Medimos, desenhamos e só então fazemos a remoção dos fios. O objetivo é valorizar o seu traço, não copiar uma tendência.",
    ],
    highlights: ["Mapeamento do rosto", "Design com pinça ou linha", "Henna opcional"],
  },
  {
    slug: "cilios",
    name: "Cílios",
    category: "olhar",
    summary: "Lash lifting ou extensão para acordar pronta.",
    description: [
      "Lash lifting curva seus próprios cílios; a extensão adiciona volume e comprimento. A gente te ajuda a escolher o efeito.",
    ],
    highlights: ["Lash lifting", "Extensão de cílios", "Manutenção"],
  },
  {
    slug: "maquiagem",
    name: "Maquiagem",
    category: "make",
    summary: "Make para festa, formatura, ensaio ou casamento.",
    description: [
      "Pele bem preparada e uma make que aguenta foto, flash e pista de dança. Para noivas e madrinhas, fazemos teste antes do grande dia.",
    ],
    highlights: ["Preparação de pele", "Cílios postiços inclusos", "Teste para noivas"],
  },
  {
    slug: "dia-da-noiva",
    name: "Dia da noiva e madrinhas",
    category: "make",
    summary: "Cabelo e make para você e para o seu grupo, no mesmo lugar.",
    description: [
      "Planejamos horários, testes e o look completo para a noiva, madrinhas e mães, sem correria no dia.",
    ],
    highlights: [
      "Prova de cabelo e make",
      "Agenda organizada para o grupo",
      "Atendimento exclusivo",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getCategoryLabel(id: Service["category"]): string {
  return serviceCategories.find((category) => category.id === id)?.label ?? "";
}
