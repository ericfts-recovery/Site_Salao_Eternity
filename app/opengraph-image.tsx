import { site } from "@/content/site";
import { OG_SIZE, renderOgImage } from "@/lib/og-image";

export const alt = `${site.name}, salão de beleza em ${site.address.city}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage({
    title: site.tagline,
    subtitle: `Salão de beleza em ${site.address.city}`,
  });
}
