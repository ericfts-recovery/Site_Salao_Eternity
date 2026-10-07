import type { FaqItem, ImageAsset, Testimonial } from "@/types/content";

/**
 * Imagens: salve as fotos em /public/images e preencha `src`.
 * Sem `src`, o site mostra um espaço reservado elegante com a descrição.
 * Dica: use fotos reais do Instagram do salão (com autorização das clientes).
 */
export const heroImages: [ImageAsset, ImageAsset] = [
  {
    alt: "[FOTO] Cliente com mechas loiras recém-finalizadas no Salão Eternity",
    width: 800,
    height: 800,
  },
  { alt: "[FOTO] Ambiente do Salão Eternity, em tons de rosa e branco", width: 800, height: 800 },
];

export const aboutImage: ImageAsset = {
  alt: "[FOTO] Equipe do Salão Eternity reunida no salão",
  width: 900,
  height: 1100,
};

export const galleryImages: ImageAsset[] = [
  { alt: "[FOTO] Mechas loiras com raiz esfumada", width: 800, height: 1000 },
  { alt: "[FOTO] Unhas em gel com nail art delicada", width: 800, height: 800 },
  { alt: "[FOTO] Corte long bob com finalização em ondas", width: 800, height: 1000 },
  { alt: "[FOTO] Maquiagem para formatura", width: 800, height: 800 },
  { alt: "[FOTO] Design de sobrancelha com henna", width: 800, height: 1000 },
  { alt: "[FOTO] Penteado preso para casamento", width: 800, height: 800 },
];

export const hero = {
  title: "Beleza que fica com você",
  lead: "Cabelo, unhas, sobrancelha e make em um só lugar. A gente escuta o que você quer antes de começar, e você sai daqui sabendo cuidar do resultado.",
};

/** Motivos para escolher o salão. [CONFIRMAR com o cliente] */
export const reasons = [
  {
    title: "Primeiro a conversa",
    text: "Todo atendimento começa entendendo sua rotina e o que você espera. Nada de surpresa no espelho.",
  },
  {
    title: "Técnica atualizada",
    text: "Equipe em formação constante para trazer as técnicas e tendências que você vê no feed, com segurança para o fio.",
  },
  {
    title: "Tudo num lugar só",
    text: "Cabelo, unhas, sobrancelha, cílios e make. Dá para resolver o look inteiro numa visita.",
  },
] as const;

export const about = {
  title: "Um salão feito para você se sentir em casa",
  paragraphs: [
    "[CONTAR A HISTÓRIA REAL DO SALÃO: quem fundou, desde quando atende, o que motivou a abrir o Eternity.]",
    "O nome não é por acaso: a ideia é que você saia daqui com um resultado que dure, e com vontade de voltar.",
  ],
  facts: [
    { value: "[0]", label: "anos de salão" },
    { value: "[0 mil]", label: "atendimentos" },
    { value: "[0]", label: "profissionais" },
  ],
};

/** Sequência real de agendamento, por isso numerada. */
export const bookingSteps = [
  { title: "Escolha o serviço", text: "Veja o cardápio abaixo ou mande uma foto de referência." },
  { title: "Chame no WhatsApp", text: "Respondemos com os horários livres e o valor." },
  { title: "É só vir", text: "Chegue uns minutinhos antes. O resto é com a gente." },
] as const;

/** [SUBSTITUIR] por avaliações reais (Google ou Instagram), com autorização. */
export const testimonials: Testimonial[] = [
  {
    quote: "[Depoimento real de cliente — copiar de uma avaliação do Google.]",
    author: "[Nome da cliente]",
    service: "Mechas e luzes",
  },
  {
    quote: "[Depoimento real de cliente — copiar de uma avaliação do Google.]",
    author: "[Nome da cliente]",
    service: "Unhas em gel",
  },
  {
    quote: "[Depoimento real de cliente — copiar de uma avaliação do Google.]",
    author: "[Nome da cliente]",
    service: "Maquiagem",
  },
];

/** [CONFIRMAR respostas com o salão] */
export const faq: FaqItem[] = [
  {
    question: "Como faço para agendar?",
    answer:
      "Pelo WhatsApp ou pelo formulário desta página. Respondemos com os horários disponíveis e confirmamos o seu.",
  },
  {
    question: "Preciso levar foto de referência?",
    answer:
      "Ajuda bastante, principalmente para cor e corte. Pode mandar no WhatsApp antes ou mostrar na hora.",
  },
  {
    question: "Quanto tempo leva uma mecha?",
    answer:
      "Depende do comprimento, da técnica e do tom que você quer. Em média, reserve de [3 a 5 horas]. Na avaliação, a gente te passa uma estimativa mais exata.",
  },
  {
    question: "Quais formas de pagamento vocês aceitam?",
    answer: "[Pix, cartão de crédito e débito. Confirmar parcelamento.]",
  },
  {
    question: "Atendem menores de idade?",
    answer:
      "Sim. Para procedimentos químicos em menores de 18 anos, pedimos a presença ou a autorização de um responsável.",
  },
  {
    question: "E se eu precisar remarcar?",
    answer:
      "Avise com pelo menos [24 horas] de antecedência pelo WhatsApp que encontramos outro horário para você.",
  },
];
