"use client";

// Último recurso quando o próprio layout falha: sem dependências de estilo.
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          fontFamily: "system-ui, sans-serif",
          background: "#fff7fa",
          color: "#3a0a23",
          padding: "4rem 1.5rem",
        }}
      >
        <h1 style={{ fontSize: "2rem" }}>O site não carregou</h1>
        <p>Atualize a página. Se continuar, tente novamente em alguns minutos.</p>
        <button
          type="button"
          onClick={reset}
          style={{
            marginTop: "1.5rem",
            minHeight: 48,
            padding: "0 1.5rem",
            borderRadius: 999,
            border: 0,
            background: "#b0124f",
            color: "#fff",
            fontSize: 16,
          }}
        >
          Tentar de novo
        </button>
      </body>
    </html>
  );
}
