import { z } from "zod";
import { services } from "@/content/services";

export const OTHER_SERVICE = "outro";

export const periodOptions = [
  { value: "manha", label: "Manhã" },
  { value: "tarde", label: "Tarde" },
  { value: "noite", label: "Fim do dia" },
  { value: "qualquer", label: "Tanto faz" },
] as const;

const serviceValues: [string, ...string[]] = [
  OTHER_SERVICE,
  ...services.map((service) => service.slug),
];
const periodValues = periodOptions.map((option) => option.value) as unknown as [
  string,
  ...string[],
];

const onlyDigits = (value: string) => value.replace(/\D/g, "");

export const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Digite seu nome.")
    .max(80, "Use até 80 caracteres.")
    .regex(/^[\p{L}\s'.-]+$/u, "Use apenas letras no nome."),
  phone: z
    .string()
    .trim()
    .refine((value) => {
      const digits = onlyDigits(value);
      return digits.length === 10 || digits.length === 11;
    }, "Digite o WhatsApp com DDD, ex.: (51) 99999-9999."),
  service: z.enum(serviceValues, { message: "Escolha um serviço." }),
  period: z.enum(periodValues, { message: "Escolha um período." }),
  consent: z.literal(true, { message: "Precisamos da sua autorização para entrar em contato." }),
  /** Honeypot: humanos não veem este campo. Preenchido = bot (tratado no servidor). */
  company: z.string().max(200).optional(),
  /** Momento em que o formulário foi exibido (anti-bot). */
  startedAt: z.number().int().positive(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export function normalizePhone(value: string): string {
  return onlyDigits(value);
}
