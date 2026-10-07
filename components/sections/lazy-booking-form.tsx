"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/** Começa a baixar o formulário quando a seção está a ~800px de aparecer. */
const PRELOAD_MARGIN = "800px 0px";

function FormSkeleton() {
  return (
    <div aria-hidden="true" className="grid min-h-[40.5rem] content-start gap-5 sm:min-h-[36rem]">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index}>
          <div className="h-5 w-32 rounded-pill bg-algodao" />
          <div className="mt-2 h-13 rounded-field bg-algodao-claro" />
        </div>
      ))}
      <div className="h-14 rounded-pill bg-algodao" />
    </div>
  );
}

const BookingForm = dynamic(
  () => import("@/components/sections/booking-form").then((module) => module.BookingForm),
  { ssr: false, loading: () => <FormSkeleton /> },
);

/**
 * Zod + React Hook Form só são baixados perto da seção de agendamento,
 * tirando ~75 KB de JS do carregamento inicial (melhora TBT/INP).
 */
export function LazyBookingForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: PRELOAD_MARGIN },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div ref={containerRef}>{shouldLoad ? <BookingForm /> : <FormSkeleton />}</div>;
}
