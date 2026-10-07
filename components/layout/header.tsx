import Link from "next/link";
import { navLinks } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { buttonStyles } from "@/components/ui/button-styles";
import { WhatsAppIcon } from "@/components/ui/icons";
import { WhatsAppLink } from "@/components/layout/whatsapp-link";
import { MobileMenu } from "@/components/layout/mobile-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-linha/60 bg-leite/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />
        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-pill px-4 text-[0.95rem] font-medium text-ameixa transition-colors hover:text-framboesa"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          {/* Wrapper evita conflito entre "hidden" e o "inline-flex" do botão */}
          <div className="hidden sm:block">
            <WhatsAppLink location="header" className={buttonStyles()}>
              <WhatsAppIcon className="size-5" />
              Agendar
            </WhatsAppLink>
          </div>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
