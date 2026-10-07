interface JsonLdProps {
  data: object;
}

export function JsonLd({ data }: JsonLdProps) {
  // Escapa "<" para impedir que conteúdo feche a tag <script>.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
