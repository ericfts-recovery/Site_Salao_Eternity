import { bookingSteps } from "@/content/home";
import { Container } from "@/components/ui/container";
import { InfinityMark } from "@/components/ui/infinity";
import { LazyBookingForm } from "@/components/sections/lazy-booking-form";

export function BookingSection() {
  return (
    <section
      id="agendar"
      aria-labelledby="agendar-title"
      className="relative overflow-hidden bg-framboesa py-20 text-white lg:py-28"
    >
      <InfinityMark
        className="pointer-events-none absolute bottom-0 -left-40 w-[40rem] text-white/[0.06]"
        strokeWidth={36}
      />
      <Container className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <h2
            id="agendar-title"
            className="text-[2.75rem] leading-[1] text-white sm:text-6xl lg:text-7xl"
          >
            Seu próximo horário começa aqui
          </h2>
          <p className="mt-5 max-w-md text-lg text-white/85">
            Deixe seus dados e a gente te chama no WhatsApp com os horários livres. Leva menos de um
            minuto.
          </p>
          <ol className="mt-10 space-y-6">
            {bookingSteps.map((step, index) => (
              <li key={step.title} className="flex gap-5">
                <span
                  aria-hidden="true"
                  className="flex size-11 shrink-0 items-center justify-center rounded-pill border-2 border-white/40 font-display text-xl"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-sans text-lg font-semibold text-white">{step.title}</h3>
                  <p className="text-white/80">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-card bg-leite p-6 text-ameixa shadow-[0_40px_80px_-30px_rgb(58_10_35/0.6)] sm:p-9">
          <LazyBookingForm />
        </div>
      </Container>
    </section>
  );
}
