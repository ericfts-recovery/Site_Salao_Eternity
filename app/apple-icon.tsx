import { ImageResponse } from "next/og";
import { INFINITY_PATH } from "@/components/ui/infinity";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#b0124f",
      }}
    >
      <svg width="130" height="65" viewBox="0 0 400 200">
        <path
          d={INFINITY_PATH}
          fill="none"
          stroke="#ffdcea"
          strokeWidth="36"
          strokeLinejoin="round"
        />
      </svg>
    </div>,
    size,
  );
}
