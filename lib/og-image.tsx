import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { INFINITY_PATH } from "@/components/ui/infinity";

export const OG_SIZE = { width: 1200, height: 630 };

/** Satori (next/og) não lê woff2, por isso usamos a versão .woff em /assets. */
async function loadDisplayFont(): Promise<ArrayBuffer> {
  const buffer = await readFile(join(process.cwd(), "assets/gloock-latin-400.woff"));
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer;
}

export async function renderOgImage({ title, subtitle }: { title: string; subtitle: string }) {
  const font = await loadDisplayFont();

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#fff7fa",
        color: "#3a0a23",
        fontFamily: "Gloock",
        position: "relative",
      }}
    >
      <svg
        width="760"
        height="380"
        viewBox="0 0 400 200"
        style={{ position: "absolute", right: -120, top: 125 }}
      >
        <path
          d={INFINITY_PATH}
          fill="none"
          stroke="#ffdcea"
          strokeWidth="26"
          strokeLinejoin="round"
        />
        <path
          d={INFINITY_PATH}
          fill="none"
          stroke="#ff4f9a"
          strokeWidth="5"
          strokeLinejoin="round"
        />
      </svg>
      <div style={{ fontSize: 44, display: "flex" }}>Eternity</div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
        <div style={{ fontSize: 92, lineHeight: 1 }}>{title}</div>
        <div style={{ fontSize: 34, marginTop: 24, color: "#b0124f" }}>{subtitle}</div>
      </div>
    </div>,
    { ...OG_SIZE, fonts: [{ name: "Gloock", data: font, weight: 400, style: "normal" }] },
  );
}
