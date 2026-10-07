"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { serviceCategories, services } from "@/content/services";
import {
  bookingSchema,
  OTHER_SERVICE,
  periodOptions,
  type BookingInput,
} from "@/lib/booking-schema";
import { requestBooking, type BookingResult } from "@/lib/actions/request-booking";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { buttonStyles } from "@/components/ui/button-styles";
import { CheckIcon, ChevronDownIcon, WhatsAppIcon } from "@/components/ui/icons";

type BookingFormValues = z.input<typeof bookingSchema>;

const fieldClass =
  "mt-2 block min-h-13 w-full rounded-field border-2 border-linha bg-white px-4 text-base text-ameixa transition-colors placeholder:text-ameixa-suave/70 hover:border-chiclete/60 focus:border-framboesa focus:outline-none aria-[invalid=true]:border-framboesa";
const labelClass = "block font-semibold text-ameixa";
const errorClass = "mt-1.5 text-sm font-medium text-framboesa";

/** Formata enquanto digita: (51) 99999-9999 */
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  const split = digits.length === 11 ? 7 : 6;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, split)}-${digits.slice(split)}`;
}

type SuccessResult = Extract<BookingResult, { status: "success" }>;

export function BookingForm() {
  const [startedAt] = useState(() => Date.now());
  const [success, setSuccess] = useState<SuccessResult | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<BookingFormValues, unknown, BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { name: "", phone: "", service: "", period: "", company: "", startedAt },
    mode: "onTouched",
  });

  const phoneField = register("phone");

  const onSubmit = (values: BookingInput) => {
    setServerError(null);
    trackEvent("booking_submit", { service: values.service });

    startTransition(async () => {
      try {
        const result = await requestBooking(values);
        if (result.status === "success") {
          trackEvent("booking_success", { service: values.service });
          setSuccess(result);
          return;
        }
        trackEvent("booking_error", { reason: "validation" });
        setServerError(result.message);
        for (const [field, message] of Object.entries(result.fieldErrors ?? {})) {
          setError(field as keyof BookingFormValues, { message });
        }
      } catch {
        trackEvent("booking_error", { reason: "network" });
        setServerError(
          "Não conseguimos enviar agora. Verifique sua internet ou chame no WhatsApp.",
        );
      }
    });
  };

  if (success) {
    return (
      <div className="flex flex-col items-start" role="status">
        <span className="inline-flex size-14 items-center justify-center rounded-pill bg-algodao text-framboesa">
          <CheckIcon className="size-7" />
        </span>
        <h3 className="mt-5 text-4xl leading-tight">Pedido enviado</h3>
        <p className="mt-3 text-lg text-ameixa-suave">
          {success.emailed
            ? "Já recebemos seu pedido e vamos te chamar no WhatsApp para confirmar o horário. Quer adiantar? Mande a mensagem agora."
            : "Falta só um passo: envie a mensagem que preparamos no WhatsApp para confirmarmos seu horário."}
        </p>
        <a
          href={success.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp_click"
          data-track-location="booking_success"
          className={buttonStyles({ size: "lg" }, "mt-6")}
        >
          <WhatsAppIcon className="size-5" />
          Enviar no WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-describedby={serverError ? "booking-error" : undefined}
    >
      <div className="grid gap-5">
        <div>
          <label htmlFor="booking-name" className={labelClass}>
            Seu nome
          </label>
          <input
            id="booking-name"
            type="text"
            autoComplete="name"
            className={fieldClass}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "booking-name-error" : undefined}
            {...register("name")}
          />
          {errors.name && (
            <p id="booking-name-error" className={errorClass}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="booking-phone" className={labelClass}>
            WhatsApp com DDD
          </label>
          <input
            id="booking-phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="(51) 99999-9999"
            className={fieldClass}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "booking-phone-error" : undefined}
            {...phoneField}
            onChange={(event) => {
              setValue("phone", formatPhone(event.target.value), {
                shouldValidate: Boolean(errors.phone),
              });
            }}
          />
          {errors.phone && (
            <p id="booking-phone-error" className={errorClass}>
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="booking-service" className={labelClass}>
            Serviço
          </label>
          <div className="relative">
            <select
              id="booking-service"
              className={cn(fieldClass, "appearance-none pr-12")}
              aria-invalid={Boolean(errors.service)}
              aria-describedby={errors.service ? "booking-service-error" : undefined}
              {...register("service")}
            >
              <option value="" disabled>
                Escolha um serviço
              </option>
              {serviceCategories.map((category) => (
                <optgroup key={category.id} label={category.label}>
                  {services
                    .filter((service) => service.category === category.id)
                    .map((service) => (
                      <option key={service.slug} value={service.slug}>
                        {service.name}
                      </option>
                    ))}
                </optgroup>
              ))}
              <option value={OTHER_SERVICE}>Outro / quero orientação</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-4 bottom-4 size-5 text-framboesa" />
          </div>
          {errors.service && (
            <p id="booking-service-error" className={errorClass}>
              {errors.service.message}
            </p>
          )}
        </div>

        <fieldset aria-describedby={errors.period ? "booking-period-error" : undefined}>
          <legend className={labelClass}>Melhor período</legend>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {periodOptions.map((option) => (
              <label key={option.value} className="relative">
                <input
                  type="radio"
                  value={option.value}
                  className="peer sr-only"
                  {...register("period")}
                />
                <span className="flex min-h-12 cursor-pointer items-center justify-center rounded-pill border-2 border-linha bg-white px-3 text-center font-medium text-ameixa transition-colors peer-checked:border-ameixa peer-checked:bg-ameixa peer-checked:text-white peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-framboesa hover:border-chiclete">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
          {errors.period && (
            <p id="booking-period-error" className={errorClass}>
              {errors.period.message}
            </p>
          )}
        </fieldset>

        {/* Honeypot: invisível para pessoas, irresistível para bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="booking-company">Empresa</label>
          <input
            id="booking-company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("company")}
          />
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] leading-relaxed text-ameixa">
            <input
              type="checkbox"
              className="mt-0.5 size-6 shrink-0 cursor-pointer rounded accent-framboesa"
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "booking-consent-error" : undefined}
              {...register("consent")}
            />
            <span>
              Autorizo o Salão Eternity a usar meu nome e WhatsApp para responder este pedido,
              conforme a{" "}
              <Link
                href="/politica-de-privacidade"
                className="font-semibold text-framboesa underline underline-offset-4"
              >
                política de privacidade
              </Link>
              .
            </span>
          </label>
          {errors.consent && (
            <p id="booking-consent-error" className={errorClass}>
              {errors.consent.message}
            </p>
          )}
        </div>

        {serverError && (
          <p
            id="booking-error"
            role="alert"
            className="rounded-field bg-algodao-claro px-4 py-3 font-medium text-framboesa"
          >
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className={buttonStyles({ size: "lg" }, "w-full")}
        >
          {isPending ? "Enviando pedido…" : "Pedir horário"}
        </button>
      </div>
    </form>
  );
}
