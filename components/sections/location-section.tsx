import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { ClockIcon, MapPinIcon, PhoneIcon } from "@/components/ui/icons";
import { LocationMap } from "@/components/sections/location-map";

export function LocationSection() {
  return (
    <section id="onde-estamos" aria-labelledby="onde-title" className="py-20 lg:py-28">
      <Container className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:gap-14">
        <div>
          <h2 id="onde-title" className="text-[2.5rem] leading-[1.02] sm:text-5xl">
            Onde estamos
          </h2>
          <dl className="mt-8 space-y-6">
            <div className="flex gap-4">
              <dt className="mt-1">
                <MapPinIcon className="size-6 text-framboesa" />
                <span className="sr-only">Endereço</span>
              </dt>
              <dd>
                <address className="leading-relaxed not-italic">
                  {site.address.street}, {site.address.neighborhood}
                  <br />
                  {site.address.city} – {site.address.state}, {site.address.postalCode}
                </address>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="cta_click"
                  data-track-location="como_chegar"
                  className="mt-1 inline-flex min-h-11 items-center font-semibold text-framboesa underline underline-offset-4"
                >
                  Como chegar
                </a>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="mt-1">
                <ClockIcon className="size-6 text-framboesa" />
                <span className="sr-only">Horário de atendimento</span>
              </dt>
              <dd>
                <ul className="space-y-1">
                  {site.hours.map((slot) => (
                    <li key={slot.label}>
                      <span className="font-semibold">{slot.label}</span>: {slot.opens} às{" "}
                      {slot.closes}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="mt-1">
                <PhoneIcon className="size-6 text-framboesa" />
                <span className="sr-only">Telefone</span>
              </dt>
              <dd>
                <a
                  href={`tel:${site.phone.e164}`}
                  data-track="phone_click"
                  data-track-location="localizacao"
                  className="inline-flex min-h-11 items-center font-semibold hover:text-framboesa"
                >
                  {site.phone.display}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <LocationMap />
      </Container>
    </section>
  );
}
