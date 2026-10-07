import Link from "next/link";
import { Container } from "@/components/ui/container";
import { InfinityMark } from "@/components/ui/infinity";
import { buttonStyles } from "@/components/ui/button-styles";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center py-20">
      <InfinityMark className="w-28 text-chiclete" strokeWidth={30} />
      <h1 className="mt-8 text-5xl leading-[1.02] sm:text-7xl">Esta página não existe</h1>
      <p className="mt-4 max-w-md text-lg text-ameixa-suave">
        O link pode estar errado ou a página mudou de endereço. Volte para o início e encontre o
        serviço que procura.
      </p>
      <Link href="/" className={buttonStyles({ size: "lg" }, "mt-8")}>
        Voltar para o início
      </Link>
    </Container>
  );
}
