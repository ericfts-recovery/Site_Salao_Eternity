import { faq } from "@/content/home";
import { faqJsonLd } from "@/lib/structured-data";
import { JsonLd } from "@/components/ui/json-ld";
import { Hero } from "@/components/sections/hero";
import { Reasons } from "@/components/sections/reasons";
import { ServicesSection } from "@/components/sections/services-section";
import { Gallery } from "@/components/sections/gallery";
import { About } from "@/components/sections/about";
import { Testimonials } from "@/components/sections/testimonials";
import { FaqSection } from "@/components/sections/faq-section";
import { BookingSection } from "@/components/sections/booking-section";
import { LocationSection } from "@/components/sections/location-section";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />
      <Hero />
      <Reasons />
      <ServicesSection />
      <Gallery />
      <About />
      <Testimonials />
      <FaqSection />
      <BookingSection />
      <LocationSection />
    </>
  );
}
