import { reasons } from "@/content/home";
import { Container } from "@/components/ui/container";
import { InfinityMark } from "@/components/ui/infinity";

export function Reasons() {
  return (
    <section aria-labelledby="jeito-title" className="bg-algodao-claro py-16 lg:py-20">
      <Container>
        <h2 id="jeito-title" className="max-w-xl text-[2.25rem] leading-[1.05] sm:text-5xl">
          O jeito Eternity de atender
        </h2>
        <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {reasons.map((reason) => (
            <li key={reason.title} className="border-t-2 border-chiclete/50 pt-6">
              <InfinityMark className="h-3 w-6 text-chiclete" strokeWidth={40} />
              <h3 className="mt-4 text-[1.75rem] leading-tight">{reason.title}</h3>
              <p className="mt-2 text-ameixa-suave">{reason.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
