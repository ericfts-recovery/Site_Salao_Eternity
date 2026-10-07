"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { Service, ServiceCategory, ServiceCategoryId } from "@/types/content";
import { cn } from "@/lib/cn";

interface ServiceTabsProps {
  categories: ServiceCategory[];
  services: Service[];
}

const PRICE_FALLBACK = "Valor sob consulta";

/**
 * Abas acessíveis (padrão WAI-ARIA). Todos os painéis são renderizados no HTML
 * para os buscadores lerem todos os serviços; os inativos só ficam ocultos.
 */
export function ServiceTabs({ categories, services }: ServiceTabsProps) {
  const [active, setActive] = useState<ServiceCategoryId>(categories[0]?.id ?? "cabelo");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  const focusTab = (index: number) => {
    const total = categories.length;
    const next = (index + total) % total;
    const category = categories[next];
    if (!category) return;
    setActive(category.id);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keyActions: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: categories.length - 1,
    };
    const target = keyActions[event.key];
    if (target === undefined) return;
    event.preventDefault();
    focusTab(target);
  };

  return (
    <div className="mt-10">
      <div
        role="tablist"
        aria-label="Categorias de serviço"
        className="-mx-4 flex scrollbar-none gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {categories.map((category, index) => {
          const selected = category.id === active;
          return (
            <button
              key={category.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${category.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${category.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(category.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "min-h-12 shrink-0 rounded-pill border-2 px-5 font-medium transition-colors duration-300",
                selected
                  ? "border-ameixa bg-ameixa text-white"
                  : "border-linha bg-white text-ameixa hover:border-chiclete",
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {categories.map((category) => (
        <div
          key={category.id}
          role="tabpanel"
          id={`${baseId}-panel-${category.id}`}
          aria-labelledby={`${baseId}-tab-${category.id}`}
          hidden={category.id !== active}
          className="mt-6"
        >
          <ul className="border-t border-linha">
            {services
              .filter((service) => service.category === category.id)
              .map((service) => (
                <li key={service.slug} className="border-b border-linha">
                  <Link
                    href={`/servicos/${service.slug}`}
                    className="group grid gap-1 py-6 sm:grid-cols-[minmax(0,16rem)_1fr_auto] sm:items-baseline sm:gap-8"
                  >
                    <h3 className="text-[1.75rem] leading-tight text-ameixa transition-colors group-hover:text-framboesa sm:text-3xl">
                      {service.name}
                    </h3>
                    <p className="text-ameixa-suave">{service.summary}</p>
                    <p className="text-sm font-semibold text-framboesa sm:text-right">
                      {service.price ?? PRICE_FALLBACK}
                    </p>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
