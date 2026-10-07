import "server-only";
import { Resend } from "resend";
import { site } from "@/content/site";

export interface BookingEmailData {
  name: string;
  phone: string;
  serviceName: string;
  periodLabel: string;
}

/**
 * Envia o pedido para o e-mail do salão. Texto puro (sem HTML) para não haver
 * risco de injeção com o que a visitante digitou.
 */
export async function sendBookingEmail(data: BookingEmailData): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_EMAIL_TO;
  const from = process.env.BOOKING_EMAIL_FROM;
  if (!apiKey || !to || !from) return false;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: `Novo pedido de horário: ${data.serviceName}`,
    text: [
      `Novo pedido de horário pelo site do ${site.name}.`,
      "",
      `Nome: ${data.name}`,
      `WhatsApp: ${data.phone}`,
      `Serviço: ${data.serviceName}`,
      `Período preferido: ${data.periodLabel}`,
      "",
      `Responder no WhatsApp: https://wa.me/55${data.phone}`,
    ].join("\n"),
  });

  if (error) {
    console.error("[booking] Falha ao enviar e-mail:", error.name);
    return false;
  }
  return true;
}
