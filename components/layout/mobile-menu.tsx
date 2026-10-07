"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { navLinks, site } from "@/content/site";
import { CloseIcon, InstagramIcon, MenuIcon } from "@/components/ui/icons";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-12 items-center justify-center rounded-pill text-ameixa hover:bg-algodao-claro"
      >
        {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-linha bg-leite px-4 pt-2 pb-6 shadow-[0_24px_40px_-24px_rgb(58_10_35/0.35)]"
      >
        <nav aria-label="Menu mobile">
          <ul className="divide-y divide-linha/70">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center font-display text-3xl text-ameixa"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          data-track="instagram_click"
          data-track-location="mobile_menu"
          className="mt-4 inline-flex min-h-11 items-center gap-2 font-medium text-framboesa"
        >
          <InstagramIcon className="size-5" />
          {site.instagram.handle}
        </a>
      </div>
    </div>
  );
}
