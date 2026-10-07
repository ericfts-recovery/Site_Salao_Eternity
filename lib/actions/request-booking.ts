"use server";

import { headers } from "next/headers";
import { getServiceBySlug } from "@/content/services";
import { site } from "@/content/site";
import {
  bookingSchema,
  normalizePhone,
  OTHER_SERVICE,
  periodOptions,
  type BookingInput,
} from "@/lib/booking-schema";
import { isRateLimited } from "@/lib/rate-limit";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { sendBookingEmail } from "@/services/booking-email";

/** Bots costumam enviar o formulário em menos de 2,5 s. */
const MIN_FILL_TIME_MS = 2500;

export type BookingFieldErrors = Partial<Record<keyof BookingInput, string>>;

export type BookingResult =
  | { status: "success"; whatsappUrl: string; emailed: boolean }
  | { status: "error"; message: string; fieldErrors?: BookingFieldErrors };

async function getClientIp(): Promise<string> {
  const headerList = await headers();
  return (
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown"
  );
}

function buildBookingMessage(name: string, serviceName: string, periodLabel: string): string {
  return `Oi! Sou ${name} e pedi um horário pelo site do ${site.name}. Serviço: ${serviceName}. Período: ${periodLabel}.`;
}

export async function requestBooking(input: unknown): Promise<BookingResult> {
  const parsed = bookingSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors: BookingFieldErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof BookingInput | undefined;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { status: "error", message: "Confira os campos destacados.", fieldErrors };
  }

  const data = parsed.data;
  const serviceName =
    data.service === OTHER_SERVICE
      ? "Outro / quero orientação"
      : (getServiceBySlug(data.service)?.name ?? "");
  const periodLabel = periodOptions.find((option) => option.value === data.period)?.label ?? "";
  const whatsappUrl = buildWhatsAppUrl(buildBookingMessage(data.name, serviceName, periodLabel));

  // Honeypot ou envio rápido demais: fingimos sucesso para não ensinar o bot.
  const isBot = Boolean(data.company) || Date.now() - data.startedAt < MIN_FILL_TIME_MS;
  if (isBot) return { status: "success", whatsappUrl, emailed: false };

  if (isRateLimited(await getClientIp())) {
    return {
      status: "error",
      message:
        "Recebemos muitos pedidos deste aparelho. Tente de novo em alguns minutos ou chame no WhatsApp.",
    };
  }

  try {
    const emailed = await sendBookingEmail({
      name: data.name,
      phone: normalizePhone(data.phone),
      serviceName,
      periodLabel,
    });
    return { status: "success", whatsappUrl, emailed };
  } catch (error) {
    console.error(
      "[booking] Erro inesperado:",
      error instanceof Error ? error.message : "desconhecido",
    );
    // Mesmo com falha no e-mail, a visitante consegue concluir pelo WhatsApp.
    return { status: "success", whatsappUrl, emailed: false };
  }
}
